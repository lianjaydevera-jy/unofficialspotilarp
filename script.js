// Page elements and saved-data keys
const audio = new Audio();
const songCards = [...document.querySelectorAll(".song-list-grid .album-card[data-audio]")];
const nowPlaying = document.querySelector(".now-playing");
const titleDisplay = nowPlaying.querySelector("strong");
const artistDisplay = nowPlaying.querySelector("span");
const coverDisplay = nowPlaying.querySelector(".cover-image");
const fullscreenTitle = document.querySelector(".fullscreen-title");
const fullscreenArtist = document.querySelector(".fullscreen-artist");
const fullscreenCover = document.querySelector(".fullscreen-cover");
const lyricsContainer = document.querySelector(".lyrics-placeholder");
const app = document.querySelector(".app");
const nowPlayingView = document.querySelector(".now-playing-view");
const playButton = document.querySelector(".main-play");
const likeButton = document.querySelector(".like-button");
const seekBackwardButton = document.querySelector('[aria-label="Back 10 seconds"]');
const seekForwardButton = document.querySelector('[aria-label="Forward 10 seconds"]');
const progress = document.querySelector(".progress-track");
const elapsedDisplay = document.querySelector(".elapsed-time");
const durationDisplay = document.querySelector(".duration-time");
const volume = document.querySelector(".volume-track");
const message = document.querySelector(".player-message");
const searchInput = document.querySelector(".search-box input");
const songList = document.querySelector(".song-list");
const recentlyPlayedSection = document.querySelector(".recently-played");
const recentlyPlayedGrid = recentlyPlayedSection.querySelector(".album-grid");
const recentlyPlayedEmpty = recentlyPlayedSection.querySelector(".recently-played-empty");
const likedSongs = new Set();
const playlists = new Map();
const playlistSection = document.querySelector(".playlist-section");
const playlistDialog = document.querySelector(".playlist-dialog");
const playlistForm = document.querySelector(".playlist-form");
const playlistNameInput = document.querySelector(".playlist-name");
const playlistSongList = document.querySelector(".playlist-song-list");
const playlistPicker = document.querySelector(".playlist-picker");
const playlistPickerForm = document.querySelector(".playlist-picker-form");
const playlistChoices = document.querySelector(".playlist-choices");
const recentlyPlayedStorageKey = "spotilarp.recentlyPlayed";
const legacyRecentlyPlayedStorageKey = "indielarp.recentlyPlayed";
const playlistsStorageKey = "spotilarp.playlists";

// Song Lists: timestamped lyrics
const lyricsByTrack = {
    "songMp3/Baby Blue Movie - Cigarettes After Sex.mp3": [
        { time: 0, text: "♪ ♪ ♪" },
        { time: 31, text: "Baby blue movie with always4tuesdays" },
        { time: 40, text: "And her love, Sarah, at Brooklyn House Hotel" },
        { time: 47, text: "I'm just a hurricane eye (Hurricane eye)" },
        { time: 52, text: "They're not a little too shy (Too shy)" },
        { time: 56, text: "Know how I wanted to sing (Wanted to sing)" },
        { time: 61, text: "Know how they wanted to sing (Wanted to sing)" },
        { time: 67, text: "Don't you understand?" },
        { time: 70, text: "Don't you know the love that you want's all the love that you needed?" },
        { time: 77, text: "Gave me all you had" },
        { time: 79, text: "Gave me all the love that you want, all the love that you needed" },
        { time: 85, text: "♪ ♪ ♪" },
        { time: 104, text: "Baby blue movie with always4tuesdays" },
        { time: 112, text: "And her new bestie, perfectly sweet" },
        { time: 121, text: "I'm just a hurricane eye (Hurricane eye)" },
        { time: 125, text: "They're not a little too shy (Too shy)" },
        { time: 130, text: "Know how I wanted to sing (Wanted to sing)" },
        { time: 134, text: "Know how they wanted to sing (Wanted to sing)" },
        { time: 141, text: "Don't you understand?" },
        { time: 143, text: "Don't you know the love that you want's all the love that you needed?" },
        { time: 150, text: "Gave me all you had" },
        { time: 152, text: "Gave me all the love that you want, all the love that you needed" },
        { time: 158, text: "♪ ♪ ♪" },
        { time: 177, text: "Don't you understand?" },
        { time: 180, text: "Don't you know the love that you want's all the love that you needed?" },
        { time: 186, text: "Gave me all you had" },
        { time: 189, text: "Gave me all the love that you want, all the love that you needed Don't you understand?" },
        { time: 196, text: "Don't you understand?" },
        { time: 198, text: "Don't you know the love that you want's gonna make it feel sweeter?" },
        { time: 205, text: "Gave me all you had" },
        { time: 207, text: "Gave me all the love that you want, all the love that you needed" },
        { time: 213, text: "♪ ♪ ♪" },
    ],
    "songMp3/Cry - Cigarettes After Sex.mp3": [
        { time: 0, text: "♪ ♪ ♪" },
        { time: 54.92, text: "It's making you cry every time" },
        { time: 61.91, text: "You give your love to me this way" },
        { time: 68.70, text: "Saying you'd wait for me to stay" },
        { time: 75.43, text: "I know it hurts you" },
        { time: 78.25, text: "But I need to tell you something" },
        { time: 89.62, text: "My heart just can't be faithful for long" },
        { time: 100.06, text: "I swear I'll only make you cry" },
        { time: 108.79, text: "Maybe I'd change for you someday" },
        { time: 115.45, text: "But I can't help the way I feel" },
        { time: 122.21, text: "Wish I was good" },
        { time: 125.57, text: "Wish that I could give you my love now" },
        { time: 131.94, text: "But I need to tell you something" },
        { time: 142.94, text: "My heart just can't be faithful for long" },
        { time: 153.80, text: "I swear I'll only make you cry" },
        { time: 161, text: "♪ Instrumental Break ♪" },
        { time: 187.24, text: "I need to tell you something" },
        { time: 197.15, text: "My heart just can't be faithful for long" },
        { time: 207.62, text: "I swear I'll only make you cry" },
        { time: 216.5, text: "♪ ♪ ♪" },
    ],
    "songMp3/Heavenly - Cigarettes After Sex.mp3": [
        { time: 0, text: "♪ ♪ ♪" },
        { time: 18.73, text: "Wanting your love to come into me" },
        { time: 23.37, text: "Feeling it slow, over this dream" },
        { time: 28.05, text: "Touch me with a kiss" },
        { time: 32.62, text: "Touch me with a kiss" },
        { time: 37.31, text: "Now you're above feeling it still" },
        { time: 41.85, text: "Tell me it's love, tell me it's real" },
        { time: 46.45, text: "Touch me with a kiss, feel me on your lips" },
        { time: 55.39, text: "'Cause this is where" },
        { time: 59.69, text: "I wanna be" },
        { time: 64.38, text: "Where it's so sweet" },
        { time: 68.83, text: "And heavenly" },
        { time: 73.76, text: "I'm giving you all my, giving you all my" },
        { time: 78.54, text: "Giving you all my love" },
        { time: 83.09, text: "Giving you all my, giving you all my" },
        { time: 87.67, text: "Giving you all my love" },
        { time: 91.40, text: "All my love" },
        { time: 110.69, text: "Needing you now to come into me" },
        { time: 115.01, text: "Feeling it slow, over this dream" },
        { time: 119.54, text: "Touch me with a kiss" },
        { time: 124.28, text: "Feel me on your lips" },
        { time: 128.71, text: "When you're above feeling it still" },
        { time: 133.23, text: "Tell me it's love, tell me it's real" },
        { time: 137.74, text: "Touch me with a kiss, touch me with a kiss" },
        { time: 146.36, text: "'Cause this is where" },
        { time: 150.91, text: "I wanna be" },
        { time: 155.33, text: "Where it's so sweet" },
        { time: 159.83, text: "And heavenly" },
        { time: 164.62, text: "I'm giving you all my, giving you all my" },
        { time: 169.51, text: "Giving you all my love" },
        { time: 173.99, text: "Giving you all my, giving you all my" },
        { time: 178.45, text: "Giving you all my love" },
        { time: 182.09, text: "All my love" },
        { time: 200.87, text: "And when you're far away" },
        { time: 205.39, text: "I still feel it all" },
        { time: 210.76, text: "And when you're far away" },
        { time: 214.68, text: "I still feel it all the same" },
        { time: 228.02, text: "And when you're far away, far away" },
        { time: 235.34, text: "♪ [Instrumental] ♪" },
        { time: 254.91, text: "I'm giving you all my, giving you all my" },
        { time: 259.90, text: "Giving you all my love" },
        { time: 264.41, text: "Giving you all my, giving you all my" },
        { time: 268.92, text: "Giving you all my love" },
        { time: 275, text: "♪ ♪ ♪" },
    ],
    "songMp3/Let Down - Radiohead.mp3": [
        { time: 0, text: "♪ ♪ ♪" },
        { time: 22.17, text: "Transport, motorways and tramlines" },
        { time: 28.90, text: "Starting and then stopping" },
        { time: 33.62, text: "Taking off and landing" },
        { time: 38.31, text: "The emptiest of feelings" },
        { time: 43.01, text: "Disappointed people" },
        { time: 47.69, text: "Clinging onto bottles" },
        { time: 51.66, text: "And when it comes" },
        { time: 54, text: "It's so, so disappointing" },
        { time: 59.47, text: "Let down and hanging around" },
        { time: 66.54, text: "Crushed like a bug in the ground" },
        { time: 73.54, text: "Let down and hanging around" },
        { time: 78.80, text: "♪ ♪ ♪" },
        { time: 90.48, text: "Shell smashed, juices flowing" },
        { time: 94.66, text: "Wings twitch, legs are going" },
        { time: 99.40, text: "Don't get sentimental" },
        { time: 103.80, text: "It always ends up drivel" },
        { time: 108.69, text: "One day, I am gonna grow wings" },
        { time: 115.88, text: "A chemical reaction" },
        { time: 120.50, text: "Hysterical and useless" },
        { time: 125.05, text: "Hysterical and" },
        { time: 127.62, text: "Let down and hanging around" },
        { time: 134.56, text: "Crushed like a bug in the ground" },
        { time: 141.60, text: "Let down and hanging around" },
        { time: 145.80, text: "♪ ♪ ♪" },
        { time: 187.93, text: "Let down again" },
        { time: 196.00, text: "Let down again" },
        { time: 205.45, text: "Let down again" },
        { time: 210.80, text: "♪ ♪ ♪" },
        { time: 221.06, text: "You know, you know where you are with" },
        { time: 228.88, text: "You know where you are with" },
        { time: 232.63, text: "Floor collapsing, floating, bouncing back" },
        { time: 238.92, text: "(And one day) One day, I am gonna grow wings" },
        { time: 246.23, text: "A chemical reaction (You know where you are)" },
        { time: 250.80, text: "Hysterical and useless (You know where you are)" },
        { time: 255.66, text: "Hysterical and (You know where you are)" },
        { time: 258.17, text: "Let down and hanging around" },
        { time: 265.16, text: "Crushed like a bug in the ground" },
        { time: 272.05, text: "Let down and hanging around" },
        { time: 277.05, text: "♪ ♪ ♪" },
    ],
    "songMp3/Lovefool - The Cardigans.mp3": [
        { time: 4.24, text: "Dear, I fear we're facing a problem" },
        { time: 8.56, text: "You love me no longer, I know and" },
        { time: 12.85, text: "Maybe there is nothing that I can do" },
        { time: 17.87, text: "To make you do" },
        { time: 21.42, text: "Mama tells me I shouldn't bother" },
        { time: 25.74, text: "That I ought just stick to another man" },
        { time: 30.88, text: "A man that surely deserves me" },
        { time: 34.98, text: "But I think you do" },
        { time: 38.65, text: "So I cry, and I pray, and I beg" },
        { time: 42.79, text: "Love me, love me" },
        { time: 44.94, text: "Say that you love me" },
        { time: 47.24, text: "Fool me, fool me" },
        { time: 49.16, text: "Go on and fool me" },
        { time: 51.61, text: "Love me, love me" },
        { time: 53.43, text: "Pretend that you love me" },
        { time: 55.82, text: "Leave me, leave me" },
        { time: 57.53, text: "Just say that you need me" },
        { time: 61.64, text: "So I cry and I beg for you to" },
        { time: 69.34, text: "Love me, love me" },
        { time: 70.97, text: "Say that you love me" },
        { time: 73.20, text: "Leave me, leave me" },
        { time: 75.20, text: "Just say that you need me" },
        { time: 77.51, text: "I can't care 'bout anything but you" },
        { time: 86.15, text: "Lately I have desperately pondered" },
        { time: 90.33, text: "Spent my nights awake and I wonder" },
        { time: 94.63, text: "What I could have done in another way" },
        { time: 99.65, text: "To make you stay" },
        { time: 103.15, text: "Reason will not reach a solution" },
        { time: 107.44, text: "I will end up lost in confusion" },
        { time: 112.21, text: "I don't care if you really care" },
        { time: 115.82, text: "As long as you don't go" },
        { time: 120.31, text: "So I cry, and I pray, and I beg" },
        { time: 124.51, text: "Love me, love me" },
        { time: 126.43, text: "Say that you love me" },
        { time: 128.86, text: "Fool me, fool me" },
        { time: 130.74, text: "Go on and fool me" },
        { time: 133.25, text: "Love me, love me" },
        { time: 134.83, text: "Pretend that you love me" },
        { time: 137.44, text: "Leave me, leave me" },
        { time: 139.13, text: "Just say that you need me" },
        { time: 143.20, text: "So I cry and I beg for you to" },
        { time: 150.57, text: "Love me, love me" },
        { time: 152.48, text: "Say that you love me" },
        { time: 154.93, text: "Leave me, leave me" },
        { time: 156.51, text: "Just say that you need me" },
        { time: 159.19, text: "I can't care 'bout anything but you" },
        { time: 165.71, text: "(Anything but you)" },
        { time: 172.13, text: "Love me, love me" },
        { time: 174.03, text: "Say that you love me" },
        { time: 176.43, text: "Fool me, fool me" },
        { time: 178.63, text: "Go on and fool me" },
        { time: 180.76, text: "Love me, love me" },
        { time: 183.50, text: "I know that you need me" },
        { time: 185.11, text: "I can't care 'bout anything but you" },
    ],
    "songMp3/Mind Over Matter - Young The Giant.mp3": [
        { time: 0, text: "♪ ♪ ♪" },
        { time: 13.74, text: "Mind over matter" },
        { time: 15.67, text: "Does it matter to any of us?" },
        { time: 19.53, text: "Don't change the subject" },
        { time: 22.63, text: "I'm heavy on your love" },
        { time: 26.13, text: "I missed that train, New York city, it rains" },
        { time: 32.33, text: "Fly to East L.A. in big jet planes" },
        { time: 36.52, text: "(You know you're on my mind)" },
        { time: 39.59, text: "And if the world don't break" },
        { time: 42.36, text: "I'll be shakin' it" },
        { time: 45.75, text: "'Cause I'm a young man after all" },
        { time: 51.95, text: "And when the seasons change" },
        { time: 54.74, text: "Will you stand by me?" },
        { time: 58.14, text: "'Cause I'm a young man built to fall" },
        { time: 75.72, text: "Mind over matter" },
        { time: 77.70, text: "I'm in tatters thinkin' 'bout her" },
        { time: 81.94, text: "Taste my disaster (My disaster)" },
        { time: 84.63, text: "It's heavy on my tongue" },
        { time: 88.24, text: "All the lights aglow, Tokyo snows" },
        { time: 94.36, text: "Go to watch the show, curtain's closed" },
        { time: 98.51, text: "(I'm watching you this time)" },
        { time: 101.49, text: "And if the world don't break" },
        { time: 104.36, text: "I'll be shakin' it" },
        { time: 107.68, text: "'Cause I'm a young man after all" },
        { time: 113.79, text: "And when the seasons change" },
        { time: 116.68, text: "Will you stand by me?" },
        { time: 120.13, text: "'Cause I'm a young man built to fall" },
        { time: 125.46, text: "I missed that train, New York City it rains" },
        { time: 131.44, text: "Fly to East L.A. in big jet planes" },
        { time: 135.71, text: "You know you're on my mind" },
        { time: 137.78, text: "All the lights aglow, Tokyo snows" },
        { time: 143.89, text: "Go to watch the show, curtain's closed" },
        { time: 148.11, text: "(I'm watching you this time)" },
        { time: 162.47, text: "(Mind over matter)" },
        { time: 172.88, text: "You know you're on my mind" },
        { time: 188.20, text: "And if the world don't break" },
        { time: 191.17, text: "I'll be shakin' it" },
        { time: 194.46, text: "'Cause I'm a young man after all" },
        { time: 200.78, text: "And when the seasons change" },
        { time: 203.46, text: "Will you stand by me?" },
        { time: 206.70, text: "'Cause I'm a young man built to fall" },
        { time: 213.00, text: "And if the world don't break" },
        { time: 225.33, text: "And when the seasons change" },
        { time: 228.31, text: "Will you stand by me?" },
        { time: 231.60, text: "'Cause I'm a young man built to fall" },
        { time: 239, text: "♪ ♪ ♪" },
    ],
    "songMp3/Neon Moon - Cigarettes After Sex.mp3": [
        { time: 0, text: "♪ ♪ ♪" },
        { time: 11.43, text: "When the sun goes down on my side of town" },
        { time: 16.96, text: "That lonesome feeling comes to my door" },
        { time: 22.91, text: "The whole world turns blue" },
        { time: 33.14, text: "There's a rundown bar 'cross the railroad tracks" },
        { time: 38.37, text: "I've got a table for two way in the back" },
        { time: 43.90, text: "Where I sit alone and think of you" },
        { time: 54.06, text: "I spend most every night" },
        { time: 57.31, text: "Beneath the light of a neon moon" },
        { time: 64.97, text: "If you lose your one and only" },
        { time: 70.01, text: "There's always room here for the lonely" },
        { time: 75.31, text: "To watch your broken dreams" },
        { time: 77.75, text: "Dance in and out of the beams of a neon moon" },
        { time: 91.03, text: "I think of two young lovers running wild and free" },
        { time: 97.12, text: "I close my eyes, and sometimes see" },
        { time: 102.59, text: "You in the shadows of this smoke-filled room" },
        { time: 112.23, text: "No telling how many tears I've sat here and cried" },
        { time: 118.02, text: "Or how many lies that I've lied" },
        { time: 123.07, text: "Telling my poor heart you'll come back one day" },
        { time: 133.35, text: "I spend most every night" },
        { time: 136.61, text: "Beneath the light of a neon moon" },
        { time: 144.17, text: "If you lose your one and only" },
        { time: 149.20, text: "There's always room here for the lonely" },
        { time: 154.35, text: "To watch your broken dreams" },
        { time: 156.65, text: "Dance in and out of the beams of a neon moon" },
        { time: 186.87, text: "But I'll be alright as long as there's light" },
        { time: 192.10, text: "From a neon moon" },
        { time: 196.82, text: "And I'll be alright as long as there's light" },
        { time: 202.29, text: "From a neon moon" },
        { time: 205, text: "♪ ♪ ♪" },
    ],
    "songMp3/Starry Eyes - Cigarettes After Sex.mp3": [
        { time: 0, text: "♪ ♪ ♪" },
        { time: 21.47, text: "Starry eyes" },
        { time: 24.02, text: "How can I get to you, my true little" },
        { time: 31.09, text: "Starry eyes?" },
        { time: 33.47, text: "What can I say or do for you, my little" },
        { time: 40.77, text: "Starry eyes?" },
        { time: 44.36, text: "Starry eyes forever" },
        { time: 48.39, text: "Shall be mine" },
        { time: 50.33, text: "Starry eyes" },
        { time: 52.73, text: "What can I say to make you listen?" },
        { time: 59.99, text: "Starry eyes" },
        { time: 62.42, text: "What can I do for your attention?" },
        { time: 69.59, text: "Starry eyes" },
        { time: 73.10, text: "Starry eyes forever" },
        { time: 77.07, text: "Shall be mine" },
        { time: 83.98, text: "When I'm alone, I hear and feel you" },
        { time: 92.80, text: "Wish that I could reach right out and touch you" },
        { time: 101.70, text: "But knowing you're the one to greet me, and meet me" },
        { time: 110.67, text: "Two alone in the dark, may it be" },
        { time: 122.47, text: "Starry eyes" },
        { time: 124.77, text: "The sparks will fall on me" },
        { time: 132.00, text: "Starry eyes" },
        { time: 134.41, text: "Won't you listen that I'm here being" },
        { time: 141.40, text: "For you, starry eyes?" },
        { time: 145.20, text: "Starry eyes forever" },
        { time: 149.21, text: "Shall be mine" },
        { time: 154.77, text: "Starry eyes forever" },
        { time: 158.54, text: "Shall be mine" },
        { time: 161, text: "♪ ♪ ♪" },
    ],
    "songMp3/Step On Me - The Cardigans.mp3": [
        { time: 0, text: "♪ ♪ ♪" },
        { time: 13.75, text: "Oh, I think you're standing on my left foot" },
        { time: 21.37, text: "It's hurting but that's okay" },
        { time: 26.83, text: "'Cause I'm in your way" },
        { time: 35.32, text: "You'll break that foot that you're standing on" },
        { time: 43.04, text: "I'll walk with the other one" },
        { time: 51.18, text: "Do what you want to do what you want to" },
        { time: 56.53, text: "Be what you want to be what you want to" },
        { time: 61.95, text: "Go on and step on me" },
        { time: 66.75, text: "You're free to have everything you can see" },
        { time: 74.74, text: "All that you want from me" },
        { time: 79.78, text: "Free to be all that you want to be" },
        { time: 87.63, text: "Do what you want with me" },
        { time: 92.80, text: "Oh, I think you're spinning inside my head" },
        { time: 100.44, text: "I think of you all the day" },
        { time: 105.89, text: "'Cause you're in my way" },
        { time: 114.14, text: "Oh, I think you're holding the heart of mine" },
        { time: 122.16, text: "Squeeze it apart, that's fine" },
        { time: 130.09, text: "Do what you want to do what you want to" },
        { time: 135.30, text: "Be what you want to be what you want to" },
        { time: 140.55, text: "Go on and step on me" },
        { time: 145.42, text: "You're free to have everything you can see" },
        { time: 153.31, text: "All that you want from me" },
        { time: 163.39, text: "Do what you want to do what you want to" },
        { time: 168.65, text: "Be what you want to be what you want to" },
        { time: 173.92, text: "Go on and step on me" },
        { time: 180.04, text: "You're free to have everything you can see" },
        { time: 187.82, text: "All that you want from me" },
        { time: 192.00, text: "You're free to be all that you want to be" },
        { time: 200.58, text: "Do what you want with me" },
        { time: 205.78, text: "Go on and step on me" },
        { time: 210.90, text: "Go on and step on me" },
        { time: 216.07, text: "Go on and step on me" },
        { time: 221, text: "♪ ♪ ♪" },
    ],
    "songMp3/The Less I Know The Better - Tame Impala.mp3": [
        { time: 0, text: "♪ ♪ ♪" },
        { time: 24.63, text: "Someone said they left together" },
        { time: 28.64, text: "I ran out the door to get her" },
        { time: 32.76, text: "She was holding hands with Trevor" },
        { time: 36.91, text: "Not the greatest feeling ever" },
        { time: 41.70, text: "Said, \"Pull yourself together" },
        { time: 45.03, text: "You should try your luck with Heather\"" },
        { time: 49.19, text: "Then I heard they slept together" },
        { time: 53.38, text: "Oh, the less I know the better" },
        { time: 62.51, text: "The less I know the better" },
        { time: 66.29, text: "Oh, my love, can't you see yourself by my side?" },
        { time: 74.25, text: "No surprise, leanin' on his shoulder like every night" },
        { time: 82.47, text: "Oh, my love, can't you see that you're on my mind?" },
        { time: 90.71, text: "Don't suppose you could convince your lover to change his mind" },
        { time: 98.76, text: "So goodbye" },
        { time: 106.71, text: "She said, \"It's not now or never" },
        { time: 110.73, text: "Wait ten years, we'll be together\"" },
        { time: 114.86, text: "I said, \"Better late than never" },
        { time: 119.00, text: "Just don't make me wait forever\"" },
        { time: 128.10, text: "Don't make me wait forever" },
        { time: 136.11, text: "Don't make me wait forever" },
        { time: 139.78, text: "Oh, my love, can't you see yourself by my side?" },
        { time: 148.13, text: "I don't suppose you could convince your lover to change his mind" },
        { time: 157.40, text: "I was doin' fine without ya" },
        { time: 161.03, text: "'Til I saw your face, now I can't erase" },
        { time: 165.28, text: "Givin' in to all his bullshit" },
        { time: 169.26, text: "Is this what you want? Is this who you are?" },
        { time: 173.51, text: "I was doin' fine without ya" },
        { time: 177.38, text: "'Til I saw your eyes turn away from mine" },
        { time: 181.59, text: "All sweet talkin' where he wants ya" },
        { time: 185.16, text: "So, come on, Superman, say your stupid line" },
        { time: 193.35, text: "So, come on, Superman, say your stupid line" },
        { time: 201.53, text: "So, come on, Superman, say your stupid line" },
    ],
};

// Shared player, profile, and playlist state
let recentlyPlayed = [];
let currentIndex = -1;
let userName = "";
let lyricButtons = [];
let activeLyricIndex = -1;
let shuffled = false;
let repeat = false;
let trackFailed = false;
let messageTimeout;
let activePlaylist = null;
let trackToAdd = "";

audio.preload = "metadata";
audio.volume = Number(volume.value);
progress.disabled = true;

// Persistent bottom music player
// Shows short feedback messages above the player.
function showMessage(text) {
    message.textContent = text;
    message.classList.add("is-visible");
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => message.classList.remove("is-visible"), 4000);
}

// Converts audio time in seconds to the player’s minutes:seconds display.
function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
}

// Keeps the main player and each track card in sync with playback.
function updatePlayButton() {
    const isPlaying = !trackFailed && !audio.paused && !audio.ended;
    playButton.textContent = isPlaying ? "⏸" : "▶";
    playButton.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
    document.querySelectorAll(".song-list-grid .album-card, .recently-played .album-card, .top-hits .album-card[data-audio]").forEach((card) => {
        const button = card.querySelector(".album-cover button");
        const active = card.dataset.audio === songCards[currentIndex]?.dataset.audio && isPlaying;
        card.classList.toggle("is-playing", active);
        button.textContent = active ? "⏸" : "▶";
        button.setAttribute("aria-label", `${active ? "Pause" : "Play"} ${card.querySelector("h3").textContent}`);
    });
}

// Updates the like button to match the currently selected song.
function updateLikeButton() {
    const liked = currentIndex !== -1 && likedSongs.has(songCards[currentIndex].dataset.audio);
    likeButton.textContent = liked ? "♥" : "♡";
    likeButton.classList.toggle("is-liked", liked);
    likeButton.setAttribute("aria-label", liked ? "Unlike track" : "Like track");
    likeButton.setAttribute("aria-pressed", String(liked));
}

// Shows the expanded player only while the app is in fullscreen mode.
function updateFullscreenPlayerView() {
    const isFullscreenPlayer = document.fullscreenElement === app && currentIndex !== -1;
    app.classList.toggle("is-fullscreen-player", isFullscreenPlayer);
    nowPlayingView.hidden = !isFullscreenPlayer;
    fullscreenButton.setAttribute("aria-pressed", String(isFullscreenPlayer));
}

// Full-screen player lyrics
// Gets the current song’s lyrics in playback order.
function getCurrentTrackLyrics() {
    const trackPath = songCards[currentIndex]?.dataset.audio;
    return [...(lyricsByTrack[trackPath] || [])].sort((first, second) => first.time - second.time);
}

// Builds clickable lyric lines for the current song.
function renderLyrics() {
    const lyrics = getCurrentTrackLyrics();
    lyricsContainer.replaceChildren();
    lyricButtons = [];
    activeLyricIndex = -1;

    if (!lyrics.length) {
        lyricsContainer.textContent = "Add timestamped lyrics for this song in script.js.";
        return;
    }

    lyrics.forEach((line) => {
        const lyricButton = document.createElement("button");
        lyricButton.className = "lyrics-line";
        lyricButton.type = "button";
        lyricButton.textContent = line.text;
        lyricButton.addEventListener("click", () => {
            audio.currentTime = line.time;
            syncLyrics();
        });
        lyricsContainer.append(lyricButton);
        lyricButtons.push(lyricButton);
    });
}

// Highlights and scrolls to the lyric line matching the current time.
function syncLyrics() {
    const lyrics = getCurrentTrackLyrics();
    let nextActiveIndex = -1;

    for (let index = 0; index < lyrics.length; index++) {
        if (lyrics[index].time > audio.currentTime) break;
        nextActiveIndex = index;
    }

    if (nextActiveIndex === activeLyricIndex) return;
    lyricButtons.forEach((button, index) => {
        const isCurrentLine = index === nextActiveIndex;
        button.classList.toggle("is-current", isCurrentLine);
        if (isCurrentLine) {
            button.setAttribute("aria-current", "true");
        } else {
            button.removeAttribute("aria-current");
        }
    });
    activeLyricIndex = nextActiveIndex;

    if (nextActiveIndex !== -1) {
        lyricButtons[nextActiveIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

// Main area search and playlist filtering
// Shows only songs that match the search and selected playlist.
function filterMusicSections() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const playlistTracks = activePlaylist === "Liked Songs"
        ? likedSongs
        : activePlaylist
            ? new Set(playlists.get(activePlaylist) || [])
            : null;
    document.querySelectorAll(".album-remove-button").forEach((button) => {
        button.hidden = !activePlaylist;
    });
    document.querySelectorAll(".music-section").forEach((section) => {
        const cards = [...section.querySelectorAll(".album-card")];
        let visibleCount = 0;
        cards.forEach((card) => {
            const matches = (!playlistTracks || playlistTracks.has(card.dataset.audio))
                && card.textContent.toLocaleLowerCase().includes(query);
            card.hidden = !matches;
            if (matches) visibleCount++;
        });
        section.hidden = cards.length > 0 && visibleCount === 0;
    });
}

// Sidebar Navigation: playlist actions
// Saves the current playlists in this browser.
function savePlaylists() {
    try {
        localStorage.setItem(playlistsStorageKey, JSON.stringify(Object.fromEntries(playlists)));
    } catch {
        showMessage("Playlists could not be saved in this browser.");
    }
}

// Adds a playlist link and its remove button to the sidebar.
function renderPlaylistLink(name) {
    const item = document.createElement("div");
    item.className = "playlist-item";
    const link = document.createElement("a");
    link.className = "playlist-link";
    link.dataset.playlist = name;
    link.href = "#";
    const cover = document.createElement("span");
    cover.className = "mini-cover";
    cover.setAttribute("aria-hidden", "true");
    cover.textContent = "♫";
    link.append(cover, document.createTextNode(name));

    const removeButton = document.createElement("button");
    removeButton.className = "remove-playlist";
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", `Remove ${name} playlist`);
    removeButton.addEventListener("click", () => {
        if (!window.confirm(`Remove the "${name}" playlist?`)) return;
        playlists.delete(name);
        item.remove();
        savePlaylists();
        if (activePlaylist === name) activePlaylist = null;
        filterMusicSections();
        showMessage(`Removed ${name}.`);
    });

    item.append(link, removeButton);
    playlistSection.append(item);
}

// Adds playlist controls to a song card.
function addPlaylistButton(card) {
    const cover = card.querySelector(".album-cover");
    const playCardButton = cover.querySelector("button");
    playCardButton.classList.add("play-button");
    if (!cover.querySelector(".album-add-button")) {
        const addButton = document.createElement("button");
        addButton.className = "album-add-button";
        addButton.type = "button";
        addButton.textContent = "+";
        addButton.setAttribute("aria-label", `Add ${card.querySelector("h3").textContent} to a playlist`);
        addButton.addEventListener("click", (event) => {
            event.stopPropagation();
            openPlaylistPicker(card.dataset.audio);
        });
        cover.append(addButton);
    }

    if (cover.querySelector(".album-remove-button")) return;
    const removeButton = document.createElement("button");
    removeButton.className = "album-remove-button";
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", `Remove ${card.querySelector("h3").textContent} from playlist`);
    removeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        if (!activePlaylist) return;
        if (activePlaylist === "Liked Songs") {
            likedSongs.delete(card.dataset.audio);
            updateLikeButton();
        } else {
            const tracks = playlists.get(activePlaylist);
            if (tracks) {
                playlists.set(activePlaylist, tracks.filter((track) => track !== card.dataset.audio));
                savePlaylists();
            }
        }
        filterMusicSections();
        showMessage(`Removed ${card.querySelector("h3").textContent} from ${activePlaylist}.`);
    });
    cover.append(removeButton);
}

// Opens the form for creating a playlist and choosing its songs.
function openPlaylistDialog() {
    playlistNameInput.value = "";
    playlistSongList.replaceChildren();
    songCards.forEach((card) => {
        const track = card.dataset.audio;
        const option = document.createElement("label");
        option.className = "playlist-song-option";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "tracks";
        checkbox.value = track;
        const details = document.createElement("span");
        details.textContent = `${card.querySelector("h3").textContent} — ${card.querySelector("p").textContent}`;
        option.append(checkbox, details);
        playlistSongList.append(option);
    });
    playlistDialog.showModal();
    playlistNameInput.focus();
}

// Opens the picker used to add one song to a playlist.
function openPlaylistPicker(audioPath) {
    trackToAdd = audioPath;
    playlistChoices.replaceChildren();
    ["Liked Songs", ...playlists.keys()].forEach((name, index) => {
        const option = document.createElement("label");
        option.className = "playlist-song-option";
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "playlist";
        radio.value = name;
        radio.checked = index === 0;
        const details = document.createElement("span");
        details.textContent = name;
        option.append(radio, details);
        playlistChoices.append(option);
    });
    playlistPicker.showModal();
}

// Creates a playlist if its name is valid and not already in use.
function createPlaylist(name, tracks) {
    const existingName = [...playlists.keys()].find((playlist) => playlist.toLocaleLowerCase() === name.toLocaleLowerCase());
    if (!name || name.toLocaleLowerCase() === "liked songs" || existingName) return false;
    playlists.set(name, tracks);
    renderPlaylistLink(name);
    savePlaylists();
    activePlaylist = name;
    playlistSection.querySelectorAll(".playlist-link").forEach((item) => {
        item.classList.toggle("is-active", item.dataset.playlist === name);
    });
    filterMusicSections();
    return true;
}

// Recently played albums and popular hits
// Rebuilds the Recently Played cards from the saved song history.
function renderRecentlyPlayed() {
    recentlyPlayedGrid.replaceChildren();
    recentlyPlayed.forEach((audioPath) => {
        const songIndex = songCards.findIndex((card) => card.dataset.audio === audioPath);
        if (songIndex === -1) return;

        const recentCard = songCards[songIndex].cloneNode(true);
        recentCard.classList.remove("is-playing");
        recentCard.querySelector(".album-add-button").remove();
        recentCard.querySelector(".album-remove-button").remove();
        addPlaylistButton(recentCard);
        const button = recentCard.querySelector(".album-cover button");
        button.addEventListener("click", () => {
            if (songIndex === currentIndex && !audio.paused) {
                audio.pause();
            } else {
                playTrack(songIndex);
            }
        });
        recentlyPlayedGrid.append(recentCard);
    });

    recentlyPlayedEmpty.hidden = recentlyPlayed.length > 0;
    filterMusicSections();
    updatePlayButton();
}

// Adds the current song to history and saves that history.
function rememberRecentlyPlayed() {
    const audioPath = songCards[currentIndex]?.dataset.audio;
    if (!audioPath) return;

    recentlyPlayed = [audioPath, ...recentlyPlayed.filter((path) => path !== audioPath)];
    renderRecentlyPlayed();
    try {
        localStorage.setItem(recentlyPlayedStorageKey, JSON.stringify(recentlyPlayed));
    } catch {
        showMessage("Recently played history could not be saved in this browser.");
    }
}

// Song Lists playback and Persistent bottom music player controls
// Loads a song and updates the player details before playback.
function playTrack(index) {
    if (!songCards.length) {
        showMessage("There are no songs in the Song List yet.");
        return;
    }

    currentIndex = (index + songCards.length) % songCards.length;
    const card = songCards[currentIndex];
    const title = card.querySelector("h3").textContent.trim();
    const artist = card.querySelector("p").textContent.trim();
    const cover = card.querySelector(".cover-image");

    trackFailed = false;
    audio.pause();
    audio.src = card.dataset.audio;
    audio.load();
    titleDisplay.textContent = title;
    artistDisplay.textContent = artist;
    coverDisplay.src = cover.src;
    coverDisplay.alt = `${title} cover`;
    fullscreenTitle.textContent = title;
    fullscreenArtist.textContent = artist;
    fullscreenCover.src = cover.src;
    fullscreenCover.alt = `${title} cover`;
    updateLikeButton();
    renderLyrics();
    updateFullscreenPlayerView();
    progress.value = "0";
    progress.disabled = true;
    seekBackwardButton.disabled = true;
    seekForwardButton.disabled = true;
    elapsedDisplay.textContent = "0:00";
    durationDisplay.textContent = "0:00";
    updatePlayButton();
    audio.play().catch((error) => {
        if (error.name === "AbortError") return;
        trackFailed = true;
        audio.pause();
        updatePlayButton();
        showMessage(`Add ${card.dataset.audio} to play "${title}".`);
    });
}

// Moves to the next or previous song, respecting shuffle mode.
function playNext(direction = 1) {
    if (currentIndex === -1) {
        playTrack(0);
        return;
    }
    if (shuffled && direction === 1 && songCards.length > 1) {
        let nextIndex = currentIndex;
        while (nextIndex === currentIndex) {
            nextIndex = Math.floor(Math.random() * songCards.length);
        }
        playTrack(nextIndex);
        return;
    }
    playTrack(currentIndex + direction);
}

document.querySelectorAll(".album-card[data-audio]").forEach(addPlaylistButton);

songCards.forEach((card, index) => {
    const button = card.querySelector(".album-cover button");
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        if (index === currentIndex && !audio.paused) {
            audio.pause();
        } else {
            playTrack(index);
        }
    });
});

document.querySelectorAll(".top-hits .album-card[data-audio]").forEach((card) => {
    const index = songCards.findIndex((songCard) => songCard.dataset.audio === card.dataset.audio);
    if (index === -1) return;

    card.querySelector(".album-cover button").addEventListener("click", () => {
        if (index === currentIndex && !audio.paused) {
            audio.pause();
        } else {
            playTrack(index);
        }
    });
});

playButton.addEventListener("click", () => {
    if (currentIndex === -1) {
        playTrack(0);
    } else if (audio.paused) {
        audio.play().catch(() => {
            showMessage(`Add ${songCards[currentIndex].dataset.audio} to play this track.`);
        });
    } else {
        audio.pause();
    }
});

// Skips forward or backward without moving outside the track.
function seekBy(seconds) {
    if (currentIndex === -1 || !Number.isFinite(audio.duration)) return;
    audio.currentTime = Math.min(audio.duration, Math.max(0, audio.currentTime + seconds));
}

seekBackwardButton.addEventListener("click", () => seekBy(-10));
seekForwardButton.addEventListener("click", () => seekBy(10));

document.querySelector('[aria-label="Next"]').addEventListener("click", () => playNext());
document.querySelector('[aria-label="Previous"]').addEventListener("click", () => playNext(-1));

const shuffleButton = document.querySelector('[aria-label="Shuffle"]');
shuffleButton.addEventListener("click", () => {
    shuffled = !shuffled;
    shuffleButton.setAttribute("aria-pressed", String(shuffled));
    showMessage(shuffled ? "Shuffle is on." : "Shuffle is off.");
});

const repeatButton = document.querySelector('[aria-label="Repeat"]');
repeatButton.addEventListener("click", () => {
    repeat = !repeat;
    repeatButton.setAttribute("aria-pressed", String(repeat));
    showMessage(repeat ? "Repeat is on." : "Repeat is off.");
});

audio.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = formatTime(audio.duration);
    progress.disabled = false;
    seekBackwardButton.disabled = false;
    seekForwardButton.disabled = false;
});

audio.addEventListener("timeupdate", () => {
    elapsedDisplay.textContent = formatTime(audio.currentTime);
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
        progress.value = String((audio.currentTime / audio.duration) * 100);
    }
    syncLyrics();
});
audio.addEventListener("seeked", syncLyrics);

audio.addEventListener("play", () => {
    updatePlayButton();
    rememberRecentlyPlayed();
});
audio.addEventListener("pause", updatePlayButton);
audio.addEventListener("ended", () => {
    if (trackFailed || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    if (repeat) {
        playTrack(currentIndex);
    } else if (currentIndex < songCards.length - 1 || shuffled) {
        playNext();
    } else {
        updatePlayButton();
    }
});

audio.addEventListener("error", () => {
    if (currentIndex === -1) return;
    trackFailed = true;
    audio.pause();
    seekBackwardButton.disabled = true;
    seekForwardButton.disabled = true;
    const card = songCards[currentIndex];
    updatePlayButton();
    showMessage(`MP3 not found or could not be played: ${card.dataset.audio}`);
});

progress.addEventListener("input", () => {
    if (Number.isFinite(audio.duration)) {
        audio.currentTime = (Number(progress.value) / 100) * audio.duration;
    }
});

volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
});

document.querySelector('[aria-label="Volume"]').addEventListener("click", () => {
    audio.muted = !audio.muted;
    showMessage(audio.muted ? "Muted." : "Volume restored.");
});

document.querySelector('[aria-label="Queue"]').addEventListener("click", () => {
    songList.scrollIntoView({ behavior: "smooth", block: "start" });
});

const fullscreenButton = document.querySelector('[aria-label="Full screen"]');
fullscreenButton.addEventListener("click", async () => {
    try {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
        } else {
            await app.requestFullscreen();
        }
    } catch (error) {
        showMessage(`Fullscreen could not be changed: ${error.message}`);
    }
});

document.addEventListener("fullscreenchange", () => {
    updateFullscreenPlayerView();
});

likeButton.addEventListener("click", () => {
    if (currentIndex === -1) {
        showMessage("Play a song before adding it to Liked Songs.");
        return;
    }
    const key = songCards[currentIndex].dataset.audio;
    if (likedSongs.has(key)) likedSongs.delete(key);
    else likedSongs.add(key);
    updateLikeButton();
    filterMusicSections();
});

searchInput.addEventListener("input", filterMusicSections);

// Sidebar Navigation and Featured welcome banner
document.querySelectorAll(".primary-nav .nav-link").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelectorAll(".primary-nav .nav-link").forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
        const label = link.textContent.replace(link.querySelector("span").textContent, "").trim();
        if (label === "Home") {
            activePlaylist = null;
            playlistSection.querySelectorAll(".playlist-link").forEach((item) => item.classList.remove("is-active"));
            searchInput.value = "";
            searchInput.dispatchEvent(new Event("input"));
            document.querySelector(".content-scroll").scrollTo({ top: 0, behavior: "smooth" });
        } else if (label === "Search") {
            searchInput.focus();
        } else {
            songList.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

document.querySelector(".play-mix").addEventListener("click", () => {
    shuffled = true;
    shuffleButton.setAttribute("aria-pressed", "true");
    playTrack(Math.floor(Math.random() * songCards.length));
});

document.querySelectorAll(".section-heading a").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const section = link.closest(".music-section");
        section.querySelector(".album-grid").classList.add("is-expanded");
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// Profile and playlist dialogs
document.querySelector(".greetings-button").addEventListener("click", () => {
    showMessage(userName ? `Hello, ${userName}!` : "What do I call you?");
});

document.querySelector(".profile-button").addEventListener("click", () => {
    const enteredName = window.prompt("What's your name?");
    if (enteredName && enteredName.trim()) {
        userName = enteredName.trim();
        document.querySelector("#insertedUserName").textContent = userName;
        document.querySelector(".profile-button").textContent = userName.charAt(0).toUpperCase();
        showMessage(`Hi, ${userName}!`);
    }
});

document.querySelector(".add-button").addEventListener("click", () => {
    openPlaylistDialog();
});

document.querySelector(".playlist-close").addEventListener("click", () => playlistDialog.close());
document.querySelector(".playlist-cancel").addEventListener("click", () => playlistDialog.close());
playlistDialog.addEventListener("click", (event) => {
    if (event.target === playlistDialog) playlistDialog.close();
});

document.querySelector(".picker-close").addEventListener("click", () => playlistPicker.close());
document.querySelector(".picker-cancel").addEventListener("click", () => playlistPicker.close());
playlistPicker.addEventListener("click", (event) => {
    if (event.target === playlistPicker) playlistPicker.close();
});

playlistPickerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = playlistPickerForm.querySelector('input[name="playlist"]:checked')?.value;
    if (!name) return;

    if (name === "Liked Songs") {
        likedSongs.add(trackToAdd);
        updateLikeButton();
    } else {
        const tracks = playlists.get(name);
        if (tracks.includes(trackToAdd)) {
            showMessage(`Already in ${name}.`);
            playlistPicker.close();
            return;
        }
        tracks.push(trackToAdd);
        savePlaylists();
    }

    filterMusicSections();
    playlistPicker.close();
    showMessage(`Added to ${name}.`);
});

playlistForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = playlistNameInput.value.trim();
    const tracks = [...playlistForm.querySelectorAll('input[name="tracks"]:checked')].map((checkbox) => checkbox.value);
    if (!name) {
        showMessage("Enter a playlist name.");
        playlistNameInput.focus();
        return;
    }
    if (!createPlaylist(name, tracks)) {
        showMessage("That playlist name is already in use.");
        return;
    }
    playlistDialog.close();
    showMessage(`Created ${name}.`);
});

playlistSection.addEventListener("click", (event) => {
    const link = event.target.closest(".playlist-link");
    if (!link) return;
    event.preventDefault();
    activePlaylist = link.dataset.playlist;
    playlistSection.querySelectorAll(".playlist-link").forEach((item) => {
        item.classList.toggle("is-active", item === link);
    });
    searchInput.value = "";
    filterMusicSections();
    songList.scrollIntoView({ behavior: "smooth", block: "start" });
    const tracks = activePlaylist === "Liked Songs" ? likedSongs : playlists.get(activePlaylist);
    if (!tracks?.length) showMessage("This playlist is empty.");
});

// Restore saved playlists and recently played albums
try {
    const storedHistory = localStorage.getItem(recentlyPlayedStorageKey);
    const savedHistory = JSON.parse(
        storedHistory || localStorage.getItem(legacyRecentlyPlayedStorageKey) || "[]"
    );
    if (Array.isArray(savedHistory)) {
        const availableTracks = new Set(songCards.map((card) => card.dataset.audio));
        recentlyPlayed = [...new Set(savedHistory.filter((path) => typeof path === "string" && availableTracks.has(path)))];
        if (storedHistory === null && recentlyPlayed.length) {
            localStorage.setItem(recentlyPlayedStorageKey, JSON.stringify(recentlyPlayed));
        }
    }
} catch {
    showMessage("Recently played history could not be loaded in this browser.");
}

try {
    const savedPlaylists = JSON.parse(localStorage.getItem(playlistsStorageKey) || "{}");
    const availableTracks = new Set(songCards.map((card) => card.dataset.audio));
    Object.entries(savedPlaylists).forEach(([name, tracks]) => {
        if (name && name.toLocaleLowerCase() !== "liked songs" && Array.isArray(tracks)) {
            playlists.set(name, [...new Set(tracks.filter((track) => availableTracks.has(track)))]);
            renderPlaylistLink(name);
        }
    });
} catch {
    showMessage("Playlists could not be loaded in this browser.");
}

likeButton.setAttribute("aria-pressed", "false");
renderRecentlyPlayed();