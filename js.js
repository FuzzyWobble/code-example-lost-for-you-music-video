import * as THREE from          'three'
import { _G } from              './settings.js'
import { Howl } from            './libs/howler.js'
import { CameraControls } from  './libs/camera-controls.js'
import { OrbitControls } from   './libs/threejs138/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from      './libs/threejs138/examples/jsm/loaders/GLTFLoader.js' 
import { GUI } from             './libs/threejs138/examples/jsm/libs/lil-gui.module.min.js'
CameraControls.install({THREE:THREE});

class LostForYou{

    //--------------------------------------------------------------------------------------
    constructor(){

        this.playing =              false;
        this.ready =                false;
        this.sprites =              []; //holds all sprites
        this.isMobile =             undefined;
        this.isIos =                false;
        this.time =                 0;
        this.timeOfClick =          0; 
        this.timeWhereClicked =     0; 
        this.startTime =            0; 
        this.timelineIndex =        0; 
        this.lyricsIndex =          0;
        this.lyricListNum =         -1;
        this.tubeVideoIndex =       0;
        this.song =                 undefined; //howler instance
        this.tubeMesh =             undefined; //mesh, tube
        this.videoElemTube =        undefined; //video elem, tube texture
        this.textureElemTube =      undefined; //texture, tube video
        this.gift3dText =           undefined; //mesh, 3d text
        this.timeScale =            1;
        this.updateCounter =        0;
        this.qualitySuffix =        ''; //'M' for mobile quality
        this.textureLoader =        new THREE.TextureLoader();
        this.gltfLoader =           new GLTFLoader();
        this.mouse =                {x:0,y:0,prevX:0,prevY:0,vX:0,vY:0,px:0,py:0}; //mouse move
        this.pointer =              new THREE.Vector2(); //mouse move (for raycast)
        this.clock =                new THREE.Clock();
        this.delta =                this.clock.getDelta();
        this.raycaster =            new THREE.Raycaster();
        this.spritesToLoad = 0;
        this.loadedSpriteCount = 0;
        
        this.settings = { //dat-gui
            tube:{
                scale:              7,                
                rotation:           0.003,                         
                video:              {translate:{x:0,y:0.004,z:0}}     
            },
            sprites:{
                mouse:              {lerp:0.03,dx:2,dy:2},      
                scale:              11.0,                        
            },
            trail:{
                shrink:             0.03,                        
                lifespan:           3000  
            },
            gift3dText:{
                position:           new THREE.Vector3(0,0,0),
                rotation:           new THREE.Vector3(0,0,0),
                scale:              7, 
                mouse:              {lerp:0.033,dy:0.80,dx:0.40,valy:0,valx:0}, 
                material:{
                    color:		    0xffffff,
                    roughness: 	    0.15,  
                    metalness: 	    0.05,
                    transmission:   0.98,
                    thickness:	    0.50,
                    clearcoat:      0.33,
                    reflectivity:   0.1,
                    opacity:        1.0
                }
            }
        };

        this.three = {
            ocontrols:      undefined,
            ccontrols:      undefined,
            scene:          undefined,
            renderer:       undefined,
            renderer2D:     undefined,
            camera:         undefined,
            fog:            undefined,
            hlight:         undefined,
            dlight:         undefined,
            shadowplane:    undefined,
            interact:       undefined,
            grid:           undefined,
            settings:{ //dat-gui
                scene:                  {bgcolor:0xd1260f},
                fog:                    {enabled:true,near:6,far:60},
                camera:                 {range:{near:0.1,far:100},fov:50,x:0,y:0,z:6,tx:0,ty:0,tz:0}, //camera position and target
                lights:                 {
                                            dlight_intensity:2,dlight_color:0xcccccc,dliight_position:{x:-10,y:15,z:0},dlight_shadows:false,
                                            hlight_shadows:false,hlight_intensity:2,hlight_position:{x:0,y:10,z:0},hlight_color:{top:0xeeeeee,bottom:0x333333},
                                            shadow_intensity:0.3
                                        },
                controls:               {enabled:true}, //if true, uses orbit controls
                encoding:               THREE.LinearEncoding, //THREE.sRGBEncoding,THREE.LinearEncoding
                hdr:                    {enabled:false,use:'OverheadDotsAndFloorStudio.hdr',list:['BasicStudio.hdr','BasicStudio2.hdr','BasicStudio3.hdr','RingLightAndSoftboxesStudio.hdr','SoftLightsStudio1.hdr','GreyStudio.hdr','ThreeSoftboxesStudio1.hdr','KinoStudio2.hdr','TotaStudio.hdr']},
                shadowplane:            {enabled:false,size:50,opacity:0.05},   
                shadows:                {enabled:false},
                grid:                   {enabled:false,size:10,segments:20,color:0xCCCCCC}             
            }
        };

    }

    //--------------------------------------------------------------------------------------
    init(_cb){

        _G.DATGUI = new GUI({autoPlace:false,width:300});
        var customContainer = document.getElementById("gui");
        customContainer.appendChild(_G.DATGUI.domElement);
        _G.DATGUI.close();

        this.isMobile = this.mobileCheck();
        if(navigator.userAgent.toLowerCase().indexOf('iphone') > -1 || navigator.userAgent.toLowerCase().indexOf('ipad') > -1)this.isIos = true;
        if(this.isIos)this.isMobile=true;

        this.loadSong();
        this.createThree();
        this.initCameraInteractions();
        this.initInteractions();
        this.populateSprites();
        this.createTube()
        this.createLogo(()=>{}); //loads gltf
        this.createSpritePoints();
        this.setupGui();
        this.loadSprites(()=>{ //callback when promise-all complete

            setTimeout(()=>{
                this.setUiReady();
                _cb();
            },1000);

        });

    }

    //--------------------------------------------------------------------------------------
    setUiReady(){
        document.getElementById('loading').style.display =                                  'none';
        document.getElementById('clicktostart').style.display =                             'block';
        if(_G.LFY.isIos)document.getElementById('unmute_reminder_ios').style.display =      'none';
        if(_G.LFY.isMobile||_G.LFY.isIos)document.getElementById('uihelp').innerHTML =      'DRAG TO ROTATE & PINCH TO ZOOM';
        this.resize();
    }

    //--------------------------------------------------------------------------------------
    createThree(){

        //---------------------
        //scene and renderer
        this.three.scene = new THREE.Scene();
        this.three.renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
        var parent = document.getElementById("three");
        parent.appendChild( this.three.renderer.domElement );
        this.three.renderer.domElement.id = 'mycanvas';
        this.three.renderer.setSize(window.innerWidth, window.innerHeight);
        //this.three.renderer.physicallyCorrectLights = true;
        this.three.renderer.shadowMap.enabled = this.three.settings.shadows.enabled;
        this.three.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.three.renderer.outputEncoding = this.three.settings.encoding; //THREE.sRGBEncoding,THREE.LinearEncoding
        this.three.canvas = document.getElementById("mycanvas");
        var bgcolor = new THREE.Color();
        bgcolor.setHex(this.three.settings.scene.bgcolor);
        this.three.scene.background = bgcolor;
        //this.three.renderer.setClearColor(this.three.settings.scene.bgcolor,1);

        //---------------------
        //fog
        this.three.fog = new THREE.Fog(
            this.three.settings.scene.bgcolor, 
            this.three.settings.fog.near,
            this.three.settings.fog.far 
        );
        this.three.scene.fog = this.three.fog;

        //---------------------
        //camera
        this.three.camera = new THREE.PerspectiveCamera( 
            this.three.settings.camera.fov, 
            window.innerWidth/window.innerHeight, 
            this.three.settings.camera.range.near,
            this.three.settings.camera.range.far 
        );
        this.three.camera.updateProjectionMatrix();
        this.three.scene.add(this.three.camera);
        var camAdjust = 1.0;
        if(this.isMobile)camAdjust = 1.75; //further back on mobile
        this.three.camera.position.set(
            this.three.settings.camera.x,
            this.three.settings.camera.y,
            this.three.settings.camera.z*camAdjust
        );
        // this.three.camera.target.set(
        //     this.three.settings.camera.tx,
        //     this.three.settings.camera.ty,
        //     this.three.settings.camera.tz
        // );

        //---------------------
        //hemisphwere light
        this.three.hlight = new THREE.HemisphereLight(
            this.three.settings.lights.hlight_color.top,
            this.three.settings.lights.hlight_color.bottom, 
            this.three.settings.lights.hlight_intensity
        );
        this.three.hlight.visible = true;
        this.three.hlight.position.set(
            this.three.settings.lights.hlight_position.x,
            this.three.settings.lights.hlight_position.y,
            this.three.settings.lights.hlight_position.z
        );
        this.three.hlight.castShadow = this.three.settings.lights.hlight_shadows;
        this.three.scene.add(this.three.hlight);

        //---------------------
        //direct light
        this.three.dlight = new THREE.DirectionalLight(
            this.three.settings.lights.dlight_color,
            this.three.settings.lights.dlight_intensity
        );
        this.three.dlight.position.set(
            this.three.settings.lights.dliight_position.x,
            this.three.settings.lights.dliight_position.y,
            this.three.settings.lights.dliight_position.z
        );
        this.three.dlight.castShadow = this.three.settings.lights.dlight_shadows;
        this.three.dlight.shadow.camera.zoom =      2.0; // wtf does this do
        this.three.dlight.shadow.mapSize.width =    2048; //2048 for higher res
        this.three.dlight.shadow.mapSize.height =   2048;
        this.three.dlight.shadow.camera.near =      this.three.settings.camera.range.near;
        this.three.dlight.shadow.camera.far =       this.three.settings.camera.range.far/4;
        this.three.dlight.shadow.camera.fov =       30;
        this.three.dlight.shadow.camera.left =      -16;
        this.three.dlight.shadow.camera.bottom =    -16;
        this.three.dlight.shadow.camera.top =       16;
        this.three.dlight.shadow.camera.right =     16;
        this.three.dlight.shadow.radius =           1;
        this.three.scene.add(this.three.dlight);

        //---------------------
        //shadow plane
        var s = this.three.settings.shadowplane.size;
        var planeGeometry = new THREE.PlaneGeometry(s,s);
        planeGeometry.rotateX(-Math.PI/2);
        var sm1 = new THREE.ShadowMaterial({
            color:      0x000000, 
            opacity:    this.three.settings.shadowplane.opacity
        });
        this.three.shadowplane = new THREE.Mesh(planeGeometry,sm1);
        this.three.shadowplane.receiveShadow =  true;
        this.three.shadowplane.position.y =     0.01; 
        if(this.three.settings.shadowplane.enabled)this.three.scene.add(this.three.shadowplane);

        //---------------------
        //grid
        this.three.grid = new THREE.GridHelper( 
            this.three.settings.grid.size, 
            this.three.settings.grid.segments, 
            this.three.settings.grid.color,
            this.three.settings.grid.color
        ); 
        this.three.grid.position.y = 0;
        if(this.three.settings.grid.enabled)this.three.scene.add( this.three.grid );
        //orbit controls
        this.three.ocontrols =                      new OrbitControls(this.three.camera, this.three.canvas);
        this.three.ocontrols.screenSpacePanning =   true;
        this.three.ocontrols.enablePan =            false;
        this.three.ocontrols.enableZoom =           true;
        this.three.ocontrols.enableDamping =        true;
        this.three.ocontrols.dampingFactor =        0.05;
        this.three.ocontrols.rotateSpeed =          0.25;
        this.three.ocontrols.zoomSpeed =            0.125;
        // this.three.ocontrols.maxPolarAngle =     (Math.PI/2) + 0.1;
        // this.three.ocontrols.minDistance =       0.10;
        // this.three.ocontrols.maxDistance =       50.0;

    }

    //--------------------------------------------------------------------------------------
    initCameraInteractions(){

        window.addEventListener('resize',()=>{this.resize();},false);

        if(_G.CONTROLS=="ocontrols" && this.three.settings.controls.enabled){
            this.three.ocontrols.enabled = true; 
            this.three.ocontrols.target.set(
                this.three.settings.camera.tx,
                this.three.settings.camera.ty,
                this.three.settings.camera.tz
            );
        }else{
            this.three.ocontrols.enabled = false; 
        }

        this.three.ocontrols.addEventListener("change", (c) => {
            //console.log("ocontrols change");
        });

        this.dragging = false;
        this.three.ocontrols.addEventListener("start", (c) => {
            this.dragging = true;
        });
        this.three.ocontrols.addEventListener("end", (c) => {
            setTimeout(()=>{
                this.dragging = false;
            },150);
        });

        //------------------------------------
        //camera controls
        if(_G.CONTROLS=="ccontrols"){

            this.three.ccontrols = new CameraControls( this.three.camera, this.three.renderer.domElement );

            //turn off all mouse/touch interactions
            this.three.ccontrols.mouseButtons.left =          CameraControls.ACTION.NONE;
            this.three.ccontrols.mouseButtons.middle =        CameraControls.ACTION.NONE;
            this.three.ccontrols.mouseButtons.right =         CameraControls.ACTION.NONE;
            this.three.ccontrols.mouseButtons.wheel =         CameraControls.ACTION.NONE;
            this.three.ccontrols.mouseButtons.shiftLeft =     CameraControls.ACTION.NONE;
            this.three.ccontrols.touches.one =                CameraControls.ACTION.NONE;
            this.three.ccontrols.touches.two =                CameraControls.ACTION.NONE;
            this.three.ccontrols.touches.three =              CameraControls.ACTION.NONE;

        }

    }

    //--------------------------------------------------------------------------------------
    resize(){

        document.getElementById('playbar').style.bottom = (5+parseInt(window.innerWidth*0.05))+'px';
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.three.camera.aspect = this.width/this.height;
        this.three.camera.updateProjectionMatrix();
        this.three.renderer.setSize(this.width,this.height);

    }

    //--------------------------------------------------------------------------------------
    render(){

        if(!this.running)return;

        if(_G.CONTROLS=="ocontrols" && this.three.ocontrols)this.three.ocontrols.update();
        if(_G.CONTROLS=="ccontrols" && this.three.ccontrols){
            this.delta = this.clock.getDelta();
            this.three.ccontrols.update(this.delta);
        }

        this.update();

        this.three.renderer.render(this.three.scene, this.three.camera);

    }

    //==============================================================================================
    start(){
        if(!this.running){
            this.three.renderer.setAnimationLoop( this.render.bind(this) );
            this.running=true;
        }
    }

    //==============================================================================================
    stop(){
        if(this.running){
            this.three.renderer.setAnimationLoop( null );
            this.running=false;
        }
    }

    //--------------------------------------------------------------------------------------
    mobileCheck(){
        //only size really matters for this site
        if(window.innerWidth<480||window.innerHeight<480){return true;}
        if(navigator.userAgent.indexOf("Mobi") > -1){return true;}
        return false;
    }

    //--------------------------------------------------------------------------------------
    populateSprites(){

        for(var sprite of _G.SPRITES){
            this.sprites.push({
                uid:                sprite.uid,
                position:           new THREE.Vector3(sprite.position.x,sprite.position.y,sprite.position.z),
                scale:              sprite.scale,
                color:              sprite.color,
                fps:                sprite.fps,
                parent: 		    new THREE.Object3D(),
                emit: 			    {perFrame:5,last:Date.now()},
                numPlayFrames:      sprite.playframes,
                numIdleFrames:      sprite.idleframes,
                rotation:           sprite.rotation,
                trailms:            sprite.trailms,
                particles: 		    [],                 //holds particles
                frames: 		    [],                 //holds play frame textures (trail)
                idles:              [],                 //holds idle textures
                mesh:               undefined,          //holds the main texture (not trail)
                frame:              0,
                lastFrame:          Date.now(),
                opacity: 		    0.6,
                visible:            true
            });
        }

   }

    //--------------------------------------------------------------------------------------
    loadSong(){

        this.song = new Howl({
            src:            [_G.ASSETS.MP3],
            autoplay:       false,
            loop:           true,
            volume:         0.80,
            preload:        true
        });
        this.song.once('load',()=>{
            
        });   
        this.song.on('end',()=>{
            window.location.reload();
        });

    }

    //--------------------------------------------------------------------------------------
    play(){

        if(this.playing){return;}
        this.playing = true;
        this.song.play();

        document.getElementById('playbar').style.display =                  'block';
        document.getElementById('uihelp').style.display =                   'block';
        document.getElementById('unmute_reminder_ios').style.display =      'none';
        document.getElementById('clicktostart').style.display =             'none';

        this.gift3dText.visible = false;
        this.edgeMesh.visible = false;
        this.startTime = Date.now();
        var i = 0;
        for(var sprite of this.sprites){
            sprite.mesh.visible =   _G.TIMELINE[0].sprites[i].visible;
            sprite.visible =        _G.TIMELINE[0].sprites[i].visible;
            sprite.fps =            _G.TIMELINE[0].sprites[i].fps;
            sprite.rotation =       _G.TIMELINE[0].sprites[i].rotation;
            sprite.trailms =        _G.TIMELINE[0].sprites[i].trailms;
            i++;
        }

    }

    //--------------------------------------------------------------------------------------
    createLogo(_cb){

        this.gltfLoader.load(_G.ASSETS.LOGO,(_model)=>{

            this.gift3dText = _model.scene;

            var m = new THREE.MeshPhysicalMaterial({ 
                color:			    this.settings.gift3dText.material.color,
                roughness: 		    this.settings.gift3dText.material.roughness,  
                metalness: 		    this.settings.gift3dText.material.metalness,
                transmission: 	    this.settings.gift3dText.material.transmission,
                thickness:		    this.settings.gift3dText.material.thickness,
                clearcoat:		    this.settings.gift3dText.material.clearcoat,
                side: 			    THREE.DoubleSide, //THREE.SingleSide,
                transparent:        true,
                opacity:            this.settings.gift3dText.material.opacity,
                blending:           THREE.NormalBlending,//THREE.MultiplyBlending,//THREE.NormalBlending,THREE.SubtractiveBlending,
            });
            this.gift3dText.traverse((_child)=>{
                _child.material = m;
            });

            this.gift3dText.position.set(
                this.settings.gift3dText.position.x,
                this.settings.gift3dText.position.y,
                this.settings.gift3dText.position.z,
            );

            this.gift3dText.rotation.set(
                this.settings.gift3dText.rotation.x,
                this.settings.gift3dText.rotation.y,
                this.settings.gift3dText.rotation.z,
            );
            var s = this.settings.gift3dText.scale;
            this.gift3dText.scale.set(s,s,s);
            this.three.scene.add(this.gift3dText);

            var lineMat = new THREE.LineBasicMaterial({name:"outline",color:0x000000,linewidth:1});
            var edgeGeo = new THREE.EdgesGeometry(this.gift3dText.children[0].geometry);
            this.edgeMesh = new THREE.LineSegments(edgeGeo,lineMat);
            this.edgeMesh.position.set(
                this.settings.gift3dText.position.x,
                this.settings.gift3dText.position.y,
                this.settings.gift3dText.position.z,
            );
            this.edgeMesh.rotation.set(
                this.settings.gift3dText.rotation.x,
                this.settings.gift3dText.rotation.y,
                this.settings.gift3dText.rotation.z,
            );
            this.edgeMesh.scale.set(s,s,s);
            this.three.scene.add(this.edgeMesh);

            _cb();

        });

    }

    //--------------------------------------------------------------------------------------
    createSpritePoints(){

        for(var sprite of this.sprites){

            this.three.scene.add(sprite.parent);
            sprite.parent.position.set(
                sprite.position.x,
                sprite.position.y,
                sprite.position.z,
            );
            var geometryTrail = new THREE.BufferGeometry();
            var verticesTrail = [];
            var materialTrail = new THREE.PointsMaterial({
                color: 				0xffffff,
                size:  				this.settings.sprites.scale*sprite.scale,
                sizeAttenuation: 	true,
                map: 				sprite.frames[0],
                alphaTest: 			0.33,
                transparent: 		true,
            });
            verticesTrail.push(0,0,0);
            geometryTrail.setAttribute("position", new THREE.Float32BufferAttribute(verticesTrail, 3));
            sprite.mesh = new THREE.Points(geometryTrail, materialTrail);               
            sprite.parent.add(sprite.mesh);
            sprite.mesh.visible = false;

        }

    }

    //--------------------------------------------------------------------------------------
    next_video(){
        this.tubeVideoIndex++;
        if(this.tubeVideoIndex>=_G.ASSETS.TEXTURES.TUNNEL.length)this.tubeVideoIndex=0;
        this.update_tube_tex(this.tubeVideoIndex);
    }

    //--------------------------------------------------------------------------------------
    update_tube_tex(i){
        this.videoElemTube.pause();
        this.videoElemTube.src =            'assets/video/'+_G.ASSETS.TEXTURES.TUNNEL[i]+'.mp4';
        this.textureElemTube =              new THREE.VideoTexture( this.videoElemTube );
        this.tubematerial.map =             this.textureElemTube;
        this.tubematerial.side =            THREE.DoubleSide;
        this.tubematerial.needsUpdate =     true;
        this.textureElemTube.wrapS =        THREE.MirroredRepeatWrapping;
        this.textureElemTube.wrapT =        THREE.MirroredRepeatWrapping;
        if(!this.isIos)this.textureElemTube.repeat.set( 2,2 );
        this.textureElemTube.magFilter =    THREE.LinearFilter;
        this.textureElemTube.minFilter =    THREE.LinearFilter;
        this.videoElemTube.play();
    }


    //--------------------------------------------------------------------------------------
    createTube(){

        var geometry = new THREE.CylinderGeometry( 1,1, 8, 32,1, true );
        this.tubematerial = new THREE.MeshBasicMaterial({color:0xdddddd});
        this.tubeMesh = new THREE.Mesh( geometry, this.tubematerial );
        var parent = document.getElementById("videotextures");
        this.videoElemTube = document.createElement('video');
        this.videoElemTube.loop = true;
        this.videoElemTube.src = 'assets/video/'+_G.ASSETS.TEXTURES.TUNNEL[this.tubeVideoIndex]+'.mp4';
        this.videoElemTube.setAttribute('webkit-playsinline', ''); 
        this.videoElemTube.setAttribute('crossOrigin', 'anonymous'); 
        this.videoElemTube.setAttribute('playsinline', ''); 
        parent.appendChild(this.videoElemTube);
        this.videoElemTube.id = "videotex";
        this.videoElemTube.muted = true;
        this.videoElemTube.load();
        this.textureElemTube = new THREE.VideoTexture( this.videoElemTube );
        this.tubematerial.map = this.textureElemTube;
        this.tubematerial.side = THREE.DoubleSide;
        this.tubematerial.needsUpdate = true;
        this.textureElemTube.wrapS = THREE.MirroredRepeatWrapping;
        this.textureElemTube.wrapT = THREE.MirroredRepeatWrapping;
        this.textureElemTube.magFilter = THREE.LinearFilter;
        this.textureElemTube.minFilter = THREE.LinearFilter;
        if(!this.isIos)this.textureElemTube.repeat.set( 2,2 );
        var s = this.settings.tube.scale;
        this.tubeMesh.scale.set(s,s,s);
        this.tubeMesh.position.z = (-s*0.5*8)+1;
        this.tubeMesh.rotation.x = Math.PI/2;
        this.three.scene.add( this.tubeMesh );
        this.videoElemTube.play();

    }


    //--------------------------------------------------------------------------------------
    textureLoadPromise(sprite,frameDir){
        //this is a lot of TextureLoader instances 
        return new Promise((resolve,reject) => {
            new THREE.TextureLoader().load(frameDir,(_tex)=>{
                setTimeout(()=>{
                    resolve({sprite:sprite,texture:_tex});
                },100);
            },undefined,(_error)=>{
                reject(_error);
            });
        });
    }

    //--------------------------------------------------------------------------------------
    spriteLoadCount(promise){
        promise.then(()=>{
            this.loadedSpriteCount++;
            //console.log("sprite "+this.loadedSpriteCount+"/"+this.spritesToLoad);
            //just a basic loading bar
            var barWidth = window.innerWidth * (this.loadedSpriteCount/this.spritesToLoad);
            document.getElementById('loading_bar').style.width = barWidth + 'px';
        });
        return promise;
    }

    //--------------------------------------------------------------------------------------
    loadSprites(_cb){

        //create a promise for every texture that needs to load, for every frame of every sprite
        var promises = [];
        for(var sprite of this.sprites){
            for(var f=0;f<sprite.numPlayFrames;f++)promises.push(this.textureLoadPromise(sprite,'./assets/sprites/'+sprite.uid+'/play/'+(f+1)+''+this.qualitySuffix+'.png'));
            for(var f=0;f<sprite.numIdleFrames;f++)promises.push(this.textureLoadPromise(sprite,'./assets/sprites/'+sprite.uid+'/idle/'+(f+1)+''+this.qualitySuffix+'.png'));
        }

        this.spritesToLoad = promises.length;

        var startTimePromiseAll = Date.now();
        Promise.all( promises.map(this.spriteLoadCount.bind(this)) )
            .then((returnedPromisesArray)=>{
                var totalTimePromiseAll = Date.now()-startTimePromiseAll;
                console.log("All textures loaded in "+totalTimePromiseAll+"ms");
                this.setAllFramesWithTexture(returnedPromisesArray);
                _cb();
            })
            .catch((err)=>{
                console.error('Error loading frames');
                console.error(err);
            });

    }

    //--------------------------------------------------------------------------------------
    setAllFramesWithTexture(_returnedPromisesArray){
        //order is preserved in Promise.all return so we can just push()
        for(var p of _returnedPromisesArray){
            if(p.texture.source.data.currentSrc.includes("play/")){
                p.sprite.frames.push(p.texture);
            }else{
                p.sprite.idles.push(p.texture);
            }
        }
    }

    //--------------------------------------------------------------------------------------
    initInteractions(){
        window.addEventListener('pointermove',(_e)=>{
            this.pointer.x =     ( _e.clientX / window.innerWidth ) * 2 - 1;
            this.pointer.y =     -( _e.clientY / window.innerHeight ) * 2 + 1;
        });
        window.addEventListener("mousemove",(e)=>{
            this.mouse.px =      (0.5 - (e.clientX/window.innerWidth)) / -0.5;
            this.mouse.py =      (0.5 - (e.clientY/window.innerHeight)) / 0.5;
            this.mouse.x =       e.clientX / window.innerWidth;
            this.mouse.y =       e.clientY / window.innerWidth;
            this.mouse.vX =      this.mouse.x - this.mouse.prevX;
            this.mouse.vY =      this.mouse.y - this.mouse.prevY;
            this.mouse.prevX =   this.mouse.x;
            this.mouse.prevY =   this.mouse.y;
        });
        document.getElementById('mycanvas').addEventListener("click",(e)=>{
            if(!this.ready)return;
            (this.playing) ? this.next_video() : this.play();
        });
        document.getElementById('playbar').addEventListener("click",(e)=>{
            var iw5 =    Math.floor(window.innerWidth*0.05); //5% margin
            var iw10 =   Math.floor(window.innerWidth*0.10); //5% margin x 2
            var pctX =   (e.clientX-iw5) / (window.innerWidth-iw10);
            this.seek(pctX);
        });
    }

    //--------------------------------------------------------------------------------------
    seek(_pct){

        this.song.seek(_pct*this.song.duration());
        
        this.timeOfClick =          Date.now();
        this.timeWhereClicked =     _pct*this.song.duration()*1000;

        if(_G.DEBUG)console.log("CLICKED TIME "+this.timeWhereClicked+" OF "+(this.song.duration()*1000));

        for(var i=0;i<_G.TIMELINE.length;i++){
            if(_G.TIMELINE[i].time>this.timeWhereClicked){
                this.timelineIndex = i-1;
                if(_G.DEBUG)console.log("CLICK FOR TIMELINE INDEX: "+(i-1)+"/"+_G.TIMELINE.length);
                break;
            }
        }

        for(var i=0;i<_G.LYRICS.length;i++){
            if(_G.LYRICS[i].time>this.timeWhereClicked){
                this.lyricsIndex = i-1;
                this.lyricListNum = _G.LYRICS[i-1].idx
                if(_G.DEBUG)console.log("CLICK FOR LYRICS INDEX: "+(i-1)+"/"+_G.LYRICS.length);
                break;
            }
        }

        this.updateTimelineAndLyrics();

    }

    //--------------------------------------------------------------------------------------
    updateTimelineAndLyrics(){

        var i = 0;
        for(var sprite of this.sprites){
            if(i==0){i++;continue;}
            sprite.mesh.visible =   _G.TIMELINE[this.timelineIndex].sprites[i].visible;
            sprite.visible =        _G.TIMELINE[this.timelineIndex].sprites[i].visible;
            sprite.fps =            _G.TIMELINE[this.timelineIndex].sprites[i].fps;
            sprite.trailms =        _G.TIMELINE[this.timelineIndex].sprites[i].trailms;
            sprite.rotation =       _G.TIMELINE[this.timelineIndex].sprites[i].rotation;
            if(sprite.rotation==0&&sprite.mesh.material.map){
                sprite.mesh.material.map.rotation = 0;
            }
            i++;
        }

        //lyrics
        var lyricSprite = this.sprites[0];
        if(_G.LYRICS[this.lyricsIndex].text==""){ //turn off
            lyricSprite.mesh.visible =          false;
            lyricSprite.visible =               false;
            if(_G.DEBUG)console.log("LYRICS OFF AT TIME "+this.time);
        }else{ //next lyric
            lyricSprite.mesh.visible =          true;
            lyricSprite.visible =               true;
            this.lyricListNum =                     _G.LYRICS[this.lyricsIndex].idx-1;
            lyricSprite.mesh.material.map =     lyricSprite.frames[_G.LYRICS[this.lyricsIndex].idx-1];
            if(_G.DEBUG)console.log("LYRICS NEXT INDEX "+this.lyricsIndex+" AT TIME "+this.time);
        }


    }

    //--------------------------------------------------------------------------------------
    randomRedColor(){
        var rr = (Math.random()*0.66)+0.33;
        var rg = (Math.random()*0.33)+0.33;
        var rb = (Math.random()*0.33)+0.33;
        var randcolor = new THREE.Color(rr,rg,rb);
        return randcolor;
    }

    //--------------------------------------------------------------------------------------
    update(){

        //----------------------------------
        //time
        this.delta = this.clock.getDelta();
        this.updateCounter += (this.delta*1000)/16.667;
        this.timeScale = (this.delta*1000)/16.667;

        //----------------------------------
        //3dtext
        if(!this.playing){
            if(this.gift3dText&&this.edgeMesh){
                this.settings.gift3dText.mouse.valy = this.lerp( this.settings.gift3dText.mouse.valy, (this.settings.gift3dText.mouse.dy*this.mouse.px), this.settings.gift3dText.mouse.lerp ); //move x, rotates around y plane
                this.settings.gift3dText.mouse.valx = this.lerp( this.settings.gift3dText.mouse.valx, (this.settings.gift3dText.mouse.dx*this.mouse.py), this.settings.gift3dText.mouse.lerp ); //move y, rotates around x plane            
                this.gift3dText.rotation.set(
                    -this.settings.gift3dText.mouse.valx,
                    this.settings.gift3dText.mouse.valy,
                    0
                );          
                this.edgeMesh.rotation.set(
                    -this.settings.gift3dText.mouse.valx,
                    this.settings.gift3dText.mouse.valy,
                    0
                );
            }
            if(this.gift3dText){
                var s = this.settings.gift3dText.scale + (Math.cos(this.updateCounter*0.018)*1);
                this.gift3dText.scale.set(s,s,s);
                this.edgeMesh.scale.set(s,s,s);
            }
        }

        //----------------------------------
        //----------------------------------
        if(!this.playing)return; 
        //----------------------------------
        //----------------------------------
        
        if(this.timeOfClick){
            this.time = this.timeWhereClicked + (Date.now()-this.timeOfClick);
        }else{
            this.time = Date.now()-this.startTime;
        }


        //----------------------------------
        //band
        if(this.timelineIndex<_G.TIMELINE.length-1){
            if(this.time>_G.TIMELINE[this.timelineIndex+1].time){
                this.timelineIndex++;
                //if(_G.DEBUG)console.log("BAND UPDATE INDEX "+this.timelineIndex+" AT TIME "+this.time);
                this.updateTimelineAndLyrics();
            }
        }

        //----------------------------------
        //lyrics 
        if(this.lyricsIndex<_G.LYRICS.length-1){

            if(this.time>_G.LYRICS[this.lyricsIndex+1].time){
                this.lyricsIndex++;
                //if(_G.DEBUG)console.log("LYRICS UPDATE INDEX "+this.lyricsIndex+" AT TIME "+this.time);
                this.updateTimelineAndLyrics();
            }
        }

        this.sprites[0].parent.position.y = this.sprites[0].position.y + (Math.cos(this.updateCounter*0.04)*0.3);

        //----------------------------------
        //dot
        if(this.song){
            var iw10 =       Math.floor(window.innerWidth*0.10); //5% margin x 2
            var pctX =       this.song.seek()/this.song.duration();
            var posX =       pctX * (window.innerWidth - iw10);
            document.getElementById('playdot').style.left = posX + 'px';
        }

        //----------------------------------
        //sprites
        var i=0;
        for(var sprite of this.sprites){ 

            if( Date.now()-sprite.lastFrame>1000/sprite.fps ){

                //next frame
                sprite.frame++;
                if(sprite.frame>=sprite.frames.length)sprite.frame = 0;

                //get previous rotation
                var previous_rotation;
                if(sprite.mesh.material.map)previous_rotation = sprite.mesh.material.map.rotation;

                //update teture map to frame 
                if(i>0)sprite.mesh.material.map = sprite.frames[sprite.frame];

                //set previous rotation
                if(sprite.rotation!=0 && previous_rotation)sprite.mesh.material.map.rotation = previous_rotation;
                
                if(sprite.rotation==0 && sprite.mesh.material.map)sprite.mesh.material.map.rotation = 0;

                //random color
                if(sprite.color=="rand")sprite.mesh.material.color = this.randomRedColor();
    
                //sprite.material.needsUpdate = true;

                sprite.lastFrame = Date.now();

            }

            i++;

            

        }
       
        //----------------------------------
        //trail
        var i = 0;
        for(var sprite of this.sprites){ 
            if(Date.now() - sprite.emit.last > sprite.trailms){
                sprite.emit.last = Date.now();
                this.emitTrails(sprite,i); 
            }
            i++;
        }
        for(var sprite of this.sprites)this.updateTrails(sprite);
        for(var sprite of this.sprites)this.clearTrails(sprite);
        

        //----------------------------------
        //tube
        if(this.tubeMesh){
            this.tubeMesh.rotation.y += this.settings.tube.rotation;
            if(this.tubeMesh.material.map){
                this.tubeMesh.material.map.offset.x += this.settings.tube.video.translate.x;
                this.tubeMesh.material.map.offset.y += this.settings.tube.video.translate.y;
                this.tubeMesh.material.map.offset.z += this.settings.tube.video.translate.z;
            }
        }

        //----------------------------------
        //band lerp position from mouse
        if(!this.isMobile){
            for(var sprite of this.sprites){
                sprite.parent.position.x = this.lerp( sprite.parent.position.x, sprite.position.x+(this.settings.sprites.mouse.dx*this.mouse.px), this.settings.sprites.mouse.lerp );
                sprite.parent.position.y = this.lerp( sprite.parent.position.y, sprite.position.y+(this.settings.sprites.mouse.dy*this.mouse.py), this.settings.sprites.mouse.lerp );
            }
        }

        //----------------------------------
        //rotation
        for(var sprite of this.sprites){ 
            if(sprite.rotation!=0 && sprite.mesh.material.map){
                sprite.mesh.material.map.center = new THREE.Vector2(0.5,0.5);
                sprite.mesh.material.map.rotation += sprite.rotation;
            }
        }

        //----------------------------------
        //fov modulate
        this.three.camera.fov = this.three.settings.camera.fov + (Math.cos(this.updateCounter*0.018)*12);
        var init_depht_s    = Math.tan(this.three.settings.camera.fov/2.0 * Math.PI/180.0) * 2.0;
        var current_depht_s = Math.tan(this.three.camera.fov/2.0 * Math.PI/180.0) * 2.0;
        this.three.camera.updateProjectionMatrix();

    }

    //--------------------------------------------------------------------------------------
    lerp(a,b,t){ return a * (1.0 - t) + b * t; }

    //--------------------------------------------------------------------------------------
    emitTrails(sprite,i){

        if(!sprite.visible)return;

        var frame = sprite.frame;
        if(i==0)frame = this.lyricListNum;

        var materialTrail = new THREE.PointsMaterial({
            color: 			    sprite.mesh.material.color,
            size:  				this.settings.sprites.scale*sprite.scale,
            sizeAttenuation: 	true,
            map: 				sprite.frames[frame],
            alphaTest: 	        0.33,
            transparent: 		true,
        });
        //materialTrail.color.setHSL(1.0, 1.0, 1.0);
        //materialTrail.map.center = new THREE.Vector2(0.5,0.5);

        var geometryTrail = new THREE.BufferGeometry();
        var verticesTrail = [];
        var pos = new THREE.Vector3();
        pos.set(
            sprite.parent.position.x,
            sprite.parent.position.y,
            sprite.parent.position.z
        );
        verticesTrail.push(0,0,0);
        geometryTrail.setAttribute(
            "position", 
            new THREE.Float32BufferAttribute(verticesTrail, 3)
        );
        var particleTrail = new THREE.Points(geometryTrail, materialTrail);               
        particleTrail.position.set(pos.x,pos.y,pos.z);
        //particleTrail.rotation.y = this.angle;
        this.three.scene.add(particleTrail);

        var distz =      100; //dist
        var timetoz =    10000; //ms
        var vz =         -distz/timetoz; //vel
        var vx =         vz * (sprite.parent.position.x/distz);
        var vy =         vz * (sprite.parent.position.y/distz);

        sprite.particles.push({
            created: 		Date.now(),
            opacity: 		1,
            scale: 			1,
            particle:	 	particleTrail,
            velocity: 		new THREE.Vector3(vx,vy,vz)
        });

    }

    //--------------------------------------------------------------------------------------
    updateTrails(sprite){
        //console.log(sprite.particles.length);
        for(var i=0;i<sprite.particles.length;i++){
            if(!sprite.particles[i].particle) continue;
            var pct = (Date.now()-sprite.particles[i].created) / this.settings.sprites.lifespan;
            if(pct>1)pct = 1;
            sprite.particles[i].particle.position.x += sprite.particles[i].velocity.x * (this.delta*1000);
            sprite.particles[i].particle.position.y += sprite.particles[i].velocity.y * (this.delta*1000);
            sprite.particles[i].particle.position.z += sprite.particles[i].velocity.z * (this.delta*1000);
            var s = sprite.particles[i].particle.material.size;
            s -= this.settings.trail.shrink;
            if(s<0.1)s=0.1;
            sprite.particles[i].particle.material.size = s;
        }
    }

    //--------------------------------------------------------------------------------------
    clearTrails(sprite){
        for(var i=sprite.particles.length-1;i>=0;i--){ //backwards so splice doesn't break the array and throw error
            if(Date.now()-sprite.particles[i].created<this.settings.trail.lifespan) continue;
            if(!sprite.particles[i].particle) continue;
            this.three.scene.remove(sprite.particles[i].particle);
            sprite.particles[i].particle.geometry.dispose();
            sprite.particles[i].particle.material.dispose();
            sprite.particles[i].particle = undefined;
            sprite.particles.splice(i,1);
        }
    }

    //--------------------------------------------------------------------------------------
    setupGui(){

        this.gui = _G.DATGUI.addFolder("GIFT");
        this.gui.close();

            //-----------------------------------------------------------------------
            this.gui_tube = this.gui.addFolder("TUBE");
            this.gui_tube.close();
                this.gui_tube.add(this.settings.tube, "scale", 1, 10, 0.01).name("Tube Scale").onChange((val) => {
                    this.tubeMesh.scale.set(val,val,val);
                });
                this.gui_tube.add(this.settings.tube, "rotation", -0.10, 0.10, 0.001).name("Tube Rotation").onChange((val) => {
                    
                });
                this.gui_tube.add(this.settings.tube.video.translate, "x", -0.02, 0.02, 0.001).name("Tube Video TX").onChange((val) => {
                    
                });
                this.gui_tube.add(this.settings.tube.video.translate, "y", -0.02, 0.02, 0.001).name("Tube Video TY").onChange((val) => {
                    
                });
                this.gui_tube.add(this.settings.tube.video.translate, "z", -0.02, 0.02, 0.001).name("Tube Video TZ").onChange((val) => {
                    
                });

            //-----------------------------------------------------------------------
            this.gui_band = this.gui.addFolder("BAND");
            this.gui_band.close();
                this.gui_band.add(this.settings.sprites.mouse, "lerp", 0.005, 0.05, 0.001).name("Mouse Movement Lerp").onChange((val) => {
                    
                });
                this.gui_band.add(this.settings.sprites.mouse, "dx", 0.5, 4.0, 0.1).name("Mouse Movement DX").onChange((val) => {
                    
                });
                this.gui_band.add(this.settings.sprites.mouse, "dy", 0.5, 4.0, 0.1).name("Mouse Movement DY").onChange((val) => {
                    
                });
                this.gui_band.add(this.settings.sprites, "scale", 1,25, 0.01).name("Band Scale").onChange((val) => {
                    for(var sprite of this.sprites)sprite.mesh.material.size = val;
                });

            //-----------------------------------------------------------------------
            this.gui_trail = this.gui.addFolder("TRAIL");
            this.gui_trail.close();
                this.gui_trail.add(this.settings.trail, "shrink", 0.01, 0.07, 0.001).name("Shrink Per Step").onChange((val) => {
                    
                });
                this.gui_trail.add(this.settings.trail, "lifespan", 100, 5000, 1).name("Life Span MS").onChange((val) => {
                    
                });

                this.gui_scene = _G.DATGUI.addFolder('SCENE');
                this.gui_scene.close();

            //-----------------------------------------------------------------------
            this.gui_bg = this.gui_scene.addFolder('BACKGROUND');
            this.gui_bg.close();

                this.gui_bg.addColor(this.three.settings.scene, 'bgcolor').name('Background Color').onChange((colorValue)=>{
                    var c = new THREE.Color();
                    c.setHex(colorValue);
                }).listen();
                if(this.three.settings.fog.enabled){
                    this.gui_bg.add(this.three.settings.fog, 'near', 1, 10, 1).name('Fog Near').onChange((val) => {
                        this.fog.near = val;
                    }).listen();
                    this.gui_bg.add(this.three.settings.fog, 'far', 1, 100, 1).name('Fog Far').onChange((val) => {
                        this.fog.far = val;
                    }).listen();
                }

            //-----------------------------------------------------------------------
            this.gui_lights = this.gui_scene.addFolder('LIGHTS');
            this.gui_lights.close();

                this.gui_lights.add(this.three.settings.lights, 'hlight_intensity', 0.0, 2.0, 0.01).name('Hemisphere Light Intensity').onChange((val) => {
                    this.hlight.intensity = val;
                }).listen();
                    // this.gui_lights.add(this.settings.lights.hliight_position, 'x', -25, 25, 0.01).name('Hemisphere Light X').onChange((val) => {
                    //     this.hlight.position.x = val;
                    // }).listen();
                    // this.gui_lights.add(this.settings.lights.hliight_position, 'z', -25, 25, 0.01).name('Hemisphere Light Z').onChange((val) => {
                    //     this.hlight.position.z = val;
                    // }).listen();
                    this.gui_lights.addColor(this.three.settings.lights.hlight_color, "top").onChange((colorValue) => {
                    this.hlight.color.set(colorValue);
                });
                    this.gui_lights.addColor(this.three.settings.lights.hlight_color, "bottom").onChange((colorValue) => {
                    this.hlight.groundColor.set(colorValue);
                });
                    this.gui_lights.add(this.three.settings.lights.hlight_position, 'y', 5, 25, 0.01).name('Hemisphere Light Height').onChange((val) => {
                    this.hlight.position.y = val;
                }).listen();
                    this.gui_lights.add(this.three.settings.lights, 'dlight_intensity', 0.0, 2.0, 0.01).name('Hemisphere Light Intensity').onChange((val) => {
                    this.dlight.intensity = val;
                }).listen();
                    this.gui_lights.add(this.three.settings.lights.dliight_position, 'x', -25, 25, 0.01).name('Direct Light X').onChange((val) => {
                    this.dlight.position.x = val;
                }).listen();
                    this.gui_lights.add(this.three.settings.lights.dliight_position, 'z', -25, 25, 0.01).name('Direct Light Z').onChange((val) => {
                    this.dlight.position.z = val;
                }).listen();
                    this.gui_lights.add(this.three.settings.lights.dliight_position, 'y', 5, 25, 0.01).name('Direct Light Height').onChange((val) => {
                    this.dlight.position.y = val;
                }).listen();
                    this.gui_lights.addColor(this.three.settings.lights, "dlight_color").onChange((colorValue) => {
                    this.dlight.color.set(colorValue);
                });

    }

}

document.addEventListener('DOMContentLoaded',()=>{

    _G.LFY = new LostForYou();
    _G.LFY.init(()=>{ 
        _G.LFY.ready = true;
        _G.LFY.start();
    });

},{once:true}); //why it fires twice?