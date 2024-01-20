/*

    We all know
    Time moves slow
    Time moves slow
    Please don’t go
    I won’t go
    If you don’t go

    Years float by
    In my eyes
    The time we cried

    Where do we go?
    We can’t go home
    We’ll take it slow

    Fade
    Fading away
    Fading away
    Fading away
    We’re fading away

    We all know
    We all know
    Time moves slow
    Please let go
    I’ll let go
    If you let go

    Fade
    Fading away
    Fading away
    Fading away
    We’re fading away

*/
       
export const _G = {
 
    CONTROLS:               "ocontrols",//ocontrols,ccontrols,none
    DEBUG:                  true,
    LFY:                    undefined, //instance of gift class
    DATGUI:                 undefined, //instance of datgui
    ASSETS:                 {
        LOGO:               './assets/models/gift3d/gift3d.gltf',
        MP3:                './assets/audio/lostforyou.mp3',
        TEXTURES:{
            TUNNEL:         ["tunnel1f","tunnel2f","tunnel3f"]
        }
    },
    SPRITES:[
                            {uid:"lyrics",position:{x:0,y:-0.5,z:1.75},fps:1,playframes:92,idleframes:0,scale:0.75,color:"rand",rotation:0},
                            {uid:"tj",position:{x:-2.3,y:0,z:-0.2},fps:4,playframes:17,idleframes:4,scale:1,color:0xffffff,rotation:0},
                            {uid:"jessica",position:{x:0.9,y:0,z:-0.8},fps:5,playframes:18,idleframes:2,scale:1,color:0xffffff,rotation:0},
                            {uid:"justin",position:{x:1.7,y:0,z:-0.3},fps:3,playframes:12,idleframes:2,scale:0.95,color:0xffffff,rotation:0},
                            {uid:"cooper",position:{x:-1.3,y:0,z:-0.9},fps:2,playframes:11,idleframes:1,scale:0.9,color:0xffffff,rotation:0},
                            {uid:"kallan",position:{x:2.3,y:0,z:-1.0},fps:4,playframes:13,idleframes:1,scale:0.9,color:0xffffff,rotation:0},
                            {uid:"sparkle1",position:{x:-2.3,y:2,z:-0.5},fps:8,playframes:5,idleframes:0,scale:0.33,color:"rand",rotation:0.033}, 
                            {uid:"sparkle2",position:{x:2.3,y:2,z:-0.5},fps:8,playframes:5,idleframes:0,scale:0.33,color:"rand",rotation:0.033},
                            {uid:"runner1",position:{x:0,y:0,z:-1.5},fps:12,playframes:45,idleframes:0,scale:2.0,color:"rand",rotation:0}, 
    ],
    LYRICSLIST:[ //list lyrics in order
        {text:"we"},
        {text:"all"},
        {text:"known"},
        {text:"time"},
        {text:"moves"},
        {text:"slow"},
        {text:"time"},
        {text:"moves"},
        {text:"slow"},
        {text:"please"},
        {text:"dont"},
        {text:"go"},
        {text:"i"},
        {text:"wont"},
        {text:"go"},
        {text:"if"},
        {text:"you"},
        {text:"dont"},
        {text:"go"},
        {text:"years"},
        {text:"float"},
        {text:"by"},
        {text:"in"},
        {text:"my"},
        {text:"eyes"},
        {text:"the"},
        {text:"time"},
        {text:"we"},
        {text:"we"},
        {text:"cried"},
        {text:"where"},
        {text:"do"},
        {text:"we"},
        {text:"go"},
        {text:"we"},
        {text:"can't"},
        {text:"go"},
        {text:"home"},
        {text:"we'll"},
        {text:"take"},
        {text:"it"},
        {text:"slow"},
        {text:"fade"},
        {text:"fading"},
        {text:"away"},
        {text:"fading"},
        {text:"away"},
        {text:"fading"},
        {text:"away"},
        {text:"we're"},
        {text:"fading"},
        {text:"away"},
        {text:"we"},
        {text:"all"},
        {text:"known"},
        {text:"we"},
        {text:"all"},
        {text:"known"},
        {text:"time"},
        {text:"moves"},
        {text:"slow"},
        {text:"please"},
        {text:"let"},
        {text:"go"},
        {text:"i'll"},
        {text:"let"},
        {text:"go"},
        {text:"if"},
        {text:"you"},
        {text:"let"},
        {text:"go"},
        {text:"fade"},
        {text:"fading"},
        {text:"away"},
        {text:"fading"},
        {text:"away"},
        {text:"fading"},
        {text:"away"},
        {text:"we're"},
        {text:"fading"},
        {text:"away"},
        
    ],
    LYRICS:[ //timeline for lyrics
        {time:0,text:""},
        {time:25200,text:"we",idx:1}, //1
        {time:28400,text:"all",idx:2}, //2
        {time:29100,text:"known",idx:3}, //3
        {time:32500,text:"time",idx:4}, //4
        {time:33000,text:"moves",idx:5}, //5
        {time:33600,text:"slow",idx:6}, //6
        {time:36600,text:"time",idx:7}, //7
        {time:37200,text:"moves",idx:8}, //8
        {time:37800,text:"slow",idx:9}, //9
        {time:41900,text:"please",idx:10}, //10
        {time:45000,text:"dont",idx:11}, //11
        {time:46100,text:"go",idx:12}, //12
        {time:49200,text:"i",idx:13}, //13
        {time:49800,text:"wont",idx:14}, //14
        {time:50300,text:"go",idx:15}, //15
        {time:53300,text:"if",idx:16}, //16
        {time:53500,text:"you",idx:17}, //17
        {time:53900,text:"dont",idx:18}, //18
        {time:54500,text:"go",idx:19}, //19
        {time:56600,text:""},//BREAK
        {time:75000,text:"years",idx:20}, //20
        {time:78000,text:"float",idx:21}, //21
        {time:79000,text:"by",idx:22}, //22
        {time:82000,text:"in",idx:23}, //23
        {time:83000,text:"my",idx:24}, //24
        {time:84000,text:"eyes",idx:25}, //25
        {time:86000,text:"the",idx:26}, //26
        {time:86500,text:"time",idx:27}, //27
        {time:88000,text:"cried",idx:28}, //28
        {time:92000,text:"where",idx:29}, //29
        {time:95000,text:"do",idx:30}, //30
        {time:95500,text:"we",idx:31}, //31
        {time:96000,text:"go",idx:32}, //32
        {time:99000,text:"can't",idx:33}, //33
        {time:99500,text:"go",idx:34}, //34
        {time:100000,text:"home",idx:35}, //35
        {time:103000,text:"we'll",idx:36}, //36
        {time:103500,text:"take",idx:37}, //37
        {time:104000,text:"it",idx:38}, //38
        {time:104500,text:"slow",idx:39}, //39
        {time:108500,text:"fade",idx:40}, //40
        {time:112000,text:"fading",idx:41}, //41
        {time:113000,text:"away",idx:42}, //42
        {time:116000,text:"fading",idx:43}, //43
        {time:117000,text:"away",idx:44}, //44
        {time:120000,text:"fading",idx:45}, //45
        {time:121000,text:"away",idx:46}, //46
        {time:124000,text:"we're",idx:47}, //47
        {time:124500,text:"fading",idx:48}, //48
        {time:125000,text:"away",idx:49}, //49
        {time:128000,text:""},//BREAK
        {time:133500,text:"we",idx:50}, //50
        {time:137000,text:"all",idx:51}, //51
        {time:138000,text:"known",idx:52}, //52
        {time:141000,text:"we",idx:53}, //53
        {time:141500,text:"all",idx:54}, //54
        {time:142000,text:"known",idx:55}, //55
        {time:145000,text:"time",idx:56}, //56
        {time:135300,text:"moves",idx:57}, //57
        {time:146000,text:"slow",idx:58}, //58
        {time:150500,text:"please",idx:59}, //59
        {time:153000,text:"let",idx:60}, //60
        {time:154000,text:"go",idx:61}, //61
        {time:157000,text:"i'll",idx:62}, //62
        {time:159000,text:"go",idx:63}, //63
        {time:161000,text:"if",idx:64}, //64
        {time:162000,text:"you",idx:65}, //65
        {time:162500,text:"let",idx:66}, //66
        {time:163000,text:"go",idx:67}, //67
        {time:167000,text:"fade",idx:68}, //68
        {time:170000,text:"fading",idx:69}, //69
        {time:171500,text:"away",idx:70}, //70
        {time:174500,text:"fading",idx:71}, //71
        {time:175500,text:"away",idx:72}, //72
        {time:178000,text:"fading",idx:73}, //73
        {time:179000,text:"away",idx:74}, //74
        {time:18100,text:"we're",idx:75}, //75
        {time:182000,text:"fading",idx:76}, //76
        {time:184000,text:"away",idx:77}, //77
        {time:186000,text:"fading",idx:78}, //78
        {time:188000,text:"away",idx:79}, //79
        {time:191000,text:"fading",idx:80}, //80
        {time:192000,text:"away",idx:81}, //81
        {time:195000,text:"fading",idx:82}, //82
        {time:196500,text:"away",idx:83}, //83
        {time:199000,text:"we're",idx:84}, //84
        {time:199500,text:"fading",idx:85}, //85
        {time:200000,text:"away",idx:86}, //86
        {time:203000,text:"fading",idx:87}, //87
        {time:204000,text:"away",idx:88}, //88
        {time:208000,text:"fading",idx:89}, //89
        {time:211000,text:"away",idx:90}, //90
        {time:212000,text:"fading",idx:91}, //91
        {time:217000,text:"away",idx:92}, //92
    ],
    TIMELINE:[
        {
            time:100, //start
            sprites:[
                {uid:"lyrics",visible:false,fps:6,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
                {uid:"tj",visible:true,fps:2,trailms:30,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"jessica",visible:false,fps:2,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"justin",visible:false,fps:3,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"cooper",visible:false,fps:2,trailms:44,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"kallan",visible:false,fps:4,trailms:80,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"sparkle1",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0.03}, 
                {uid:"sparkle2",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:-0.03},
                {uid:"runner1",visible:false,fps:20,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0}, 
            ]
        },
        {
            time:7700, //drop lead
            sprites:[
                {uid:"lyrics",visible:true,fps:1,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0}, 
                {uid:"tj",visible:true,fps:1,trailms:100,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"jessica",visible:true,fps:1,trailms:100,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"justin",visible:false,fps:1,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"cooper",visible:true,fps:1,trailms:44,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"kallan",visible:true,fps:1,trailms:80,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"sparkle1",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0.03}, 
                {uid:"sparkle2",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:-0.03},
                {uid:"runner1",visible:false,fps:20,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0}, 
            ]
        },
        {
            time:8500, //drop in
            sprites:[
                {uid:"lyrics",visible:true,fps:6,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0}, 
                {uid:"tj",visible:true,fps:4,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"jessica",visible:true,fps:4,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"justin",visible:false,fps:3,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"cooper",visible:true,fps:2,trailms:44,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"kallan",visible:true,fps:4,trailms:60,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"sparkle1",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0.03}, 
                {uid:"sparkle2",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:-0.03},
                {uid:"runner1",visible:false,fps:20,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0}, 
            ]
        },
        {
            time:16800, //synth in
            sprites:[
                {uid:"lyrics",visible:true,fps:6,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0}, 
                {uid:"tj",visible:true,fps:4,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"jessica",visible:true,fps:5,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"justin",visible:true,fps:3,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"cooper",visible:true,fps:2,trailms:44,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"kallan",visible:true,fps:4,trailms:80,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"sparkle1",visible:true,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0.03}, 
                {uid:"sparkle2",visible:true,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:-0.03},
                {uid:"runner1",visible:true,fps:20,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
            ]
        },
        {
            time:25200, //synth out
            sprites:[
                {uid:"lyrics",visible:true,fps:6,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
                {uid:"tj",visible:true,fps:4,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"jessica",visible:true,fps:5,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"justin",visible:false,fps:3,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"cooper",visible:true,fps:2,trailms:44,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"kallan",visible:true,fps:4,trailms:80,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"sparkle1",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0.03}, 
                {uid:"sparkle2",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:-0.03},
                {uid:"runner1",visible:false,fps:20,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
            ]
        },
        {
            time:58500, //synth in
            sprites:[
                {uid:"lyrics",visible:true,fps:6,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
                {uid:"tj",visible:true,fps:4,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"jessica",visible:true,fps:5,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"justin",visible:true,fps:5,trailms:100,color:0xffffff,trailcolor:0xffffff,rotation:0.02},
                {uid:"cooper",visible:true,fps:2,trailms:44,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"kallan",visible:true,fps:4,trailms:80,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"sparkle1",visible:true,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0.03}, 
                {uid:"sparkle2",visible:true,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:-0.03},
                {uid:"runner1",visible:true,fps:20,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
            ]
        },
        {
            time:75400, //synth out 
            sprites:[
                {uid:"lyrics",visible:true,fps:6,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
                {uid:"tj",visible:true,fps:4,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"jessica",visible:true,fps:5,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"justin",visible:false,fps:5,trailms:100,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"cooper",visible:true,fps:2,trailms:44,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"kallan",visible:true,fps:4,trailms:80,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"sparkle1",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0.03}, 
                {uid:"sparkle2",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:-0.03},
                {uid:"runner1",visible:false,fps:20,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
            ]
        },
        {
            time:76000, //TJ vocal solo 
            sprites:[
                {uid:"lyrics",visible:true,fps:6,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
                {uid:"tj",visible:true,fps:4,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"jessica",visible:false,fps:5,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"justin",visible:false,fps:5,trailms:100,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"cooper",visible:false,fps:2,trailms:44,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"kallan",visible:false,fps:4,trailms:80,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"sparkle1",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0.03}, 
                {uid:"sparkle2",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:-0.03},
                {uid:"runner1",visible:false,fps:20,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
            ]
        },
        {
            time:91000, //Band back in 2nd verse
            sprites:[
                {uid:"lyrics",visible:true,fps:6,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
                {uid:"tj",visible:true,fps:4,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"jessica",visible:true,fps:5,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"justin",visible:true,fps:5,trailms:100,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"cooper",visible:true,fps:2,trailms:44,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"kallan",visible:true,fps:4,trailms:80,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"sparkle1",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0.03}, 
                {uid:"sparkle2",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:-0.03},
                {uid:"runner1",visible:false,fps:20,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
            ]
        },
        {
            time:108000, // Chorus 1
            sprites:[
                {uid:"lyrics",visible:true,fps:6,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
                {uid:"tj",visible:true,fps:4,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"jessica",visible:true,fps:5,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"justin",visible:true,fps:5,trailms:100,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"cooper",visible:true,fps:2,trailms:44,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"kallan",visible:true,fps:4,trailms:80,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"sparkle1",visible:true,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0.03}, 
                {uid:"sparkle2",visible:true,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:-0.03},
                {uid:"runner1",visible:true,fps:20,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
            ]
        },
        {
            time:125000, // TJ solo 2
            sprites:[
                {uid:"lyrics",visible:true,fps:6,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
                {uid:"tj",visible:true,fps:4,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"jessica",visible:false,fps:5,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"justin",visible:false,fps:5,trailms:100,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"cooper",visible:false,fps:2,trailms:44,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"kallan",visible:true,fps:4,trailms:80,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"sparkle1",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0.03}, 
                {uid:"sparkle2",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:-0.03},
                {uid:"runner1",visible:false,fps:20,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
            ]
        },
   
        {
            time:148200, // Verse 3
            sprites:[
                {uid:"lyrics",visible:true,fps:6,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
                {uid:"tj",visible:true,fps:4,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"jessica",visible:true,fps:5,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"justin",visible:true,fps:5,trailms:100,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"cooper",visible:true,fps:2,trailms:44,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"kallan",visible:true,fps:4,trailms:80,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"sparkle1",visible:true,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0.03}, 
                {uid:"sparkle2",visible:true,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:-0.03},
                {uid:"runner1",visible:true,fps:20,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
            ]

        },
        {
            time:148200, // Chorus 2
            sprites:[
                {uid:"lyrics",visible:true,fps:6,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
                {uid:"tj",visible:true,fps:4,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"jessica",visible:true,fps:5,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"justin",visible:true,fps:5,trailms:100,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"cooper",visible:true,fps:2,trailms:44,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"kallan",visible:true,fps:4,trailms:80,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"sparkle1",visible:true,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0.03}, 
                {uid:"sparkle2",visible:true,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:-0.03},
                {uid:"runner1",visible:true,fps:20,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
            ]
        },
        {
            time:182400, // Chorus 2 2nd half
            sprites:[
                {uid:"lyrics",visible:true,fps:6,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
                {uid:"tj",visible:true,fps:4,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"jessica",visible:true,fps:5,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"justin",visible:true,fps:5,trailms:100,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"cooper",visible:true,fps:2,trailms:44,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"kallan",visible:true,fps:4,trailms:80,color:0xffffff,trailcolor:0xffffff,rotation:0},
                {uid:"sparkle1",visible:true,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0.03}, 
                {uid:"sparkle2",visible:true,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:-0.03},
                {uid:"runner1",visible:true,fps:20,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
            ]
        },
        {
            time:202200, // TJ End Solo
            sprites:[
                {uid:"lyrics",visible:false,fps:6,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
                {uid:"tj",visible:true,fps:4,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0.3},
                {uid:"jessica",visible:false,fps:5,trailms:66,color:0xffffff,trailcolor:0xffffff,rotation:0.1},
                {uid:"justin",visible:false,fps:5,trailms:100,color:0xffffff,trailcolor:0xffffff,rotation:0.3},
                {uid:"cooper",visible:false,fps:2,trailms:44,color:0xffffff,trailcolor:0xffffff,rotation:0.3},
                {uid:"kallan",visible:false,fps:4,trailms:80,color:0xffffff,trailcolor:0xffffff,rotation:0.3},
                {uid:"sparkle1",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0.03}, 
                {uid:"sparkle2",visible:false,fps:8,trailms:66,color:"rand",trailcolor:0xffffff,rotation:-0.03},
                {uid:"runner1",visible:false,fps:20,trailms:66,color:"rand",trailcolor:0xffffff,rotation:0},
            ]
        }

    ]

};