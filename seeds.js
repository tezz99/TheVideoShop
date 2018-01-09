/** SEEDS FILE - USED TO CREAR DATABASE AND FILL IT WITH SAMPLE DATA**/

var mongoose = require("mongoose"),
    Movie = require("./models/movie")
Review = require("./models/review");


var data = [

    {
        title: "The Disaster Artist (2017)",
        poster: "https://image.tmdb.org/t/p/w640/uCH6FOFsDW6pfvbbmIIswuvuNtM.jpg",
        trailer: "https://www.youtube.com/watch?v=cMKX2tE5Luk",
        description: "An aspiring actor in Hollywood meets an enigmatic stranger by the name of Tommy Wiseau, the meeting leads the actor down a path nobody could have predicted; creating the worst movie ever made.",
        price: "15.99"
    },

    {
        title: "There Be Dragons (2011)",
        poster: "https://image.tmdb.org/t/p/w640/dKgPtWZkHkTeYQRvLTsO0RBYaQZ.jpg",
        trailer: "https://www.youtube.com/watch?v=gCez6Y7Zcyw",
        description: "Arising out of the horror of the Spanish Civil War, a candidate for canonization is investigated by a journalist who discovers his own estranged father had a deep, dark and devastating connection to the saint's life.While researching the life of Josemaria Escriva, the controversial founder of Opus Dei, the young journalist Robert uncovers hidden stories of his estranged father Manolo, and is taken on a journey through the dark, terrible secrets of his family’s past.",
        price: "15.99"
    },

    {
        title: "Olaf's Frozen Adventure (2017)",
        poster: "https://image.tmdb.org/t/p/w640/47pLZ1gr63WaciDfHCpmoiXJlVr.jpg",
        trailer: "https://www.youtube.com/watch?v=hb8WDATVB6A",
        description: "Olaf is on a mission to harness the best holiday traditions for Anna, Elsa, and Kristoff.",
        price: "15.99"
    },

    {
        title: "Dunkirk (2017)",
        poster: "https://image.tmdb.org/t/p/w640/bOXBV303Fgkzn2K4FeKDc0O31q4.jpg",
        trailer: "https://www.youtube.com/watch?v=F-eMt3SrfFU",
        description: "The story of the miraculous evacuation of Allied soldiers from Belgium, Britain, Canada and France, who were cut off and surrounded by the German army from the beaches and harbour of Dunkirk between May 26th and June 4th 1940 during World War II.",
        price: "15.99"
    },

    {
        title: "The Greatest Showman (2017)",
        poster: "https://image.tmdb.org/t/p/w640/dfhztJRiElqmYW4kpvjYe1gENsD.jpg",
        trailer: "https://www.youtube.com/watch?v=jr9QtXwC9vc",
        description: "The story of American showman P.T. Barnum, founder of the circus that became the famous traveling Ringling Bros. and Barnum & Bailey Circus.",
        price: "15.99"
    },

    {
        title: "Sleight (2017)",
        poster: "https://image.tmdb.org/t/p/w640/wridRvGxDqGldhzAIh3IcZhHT5F.jpg",
        trailer: "https://www.youtube.com/watch?v=zr22-81AsKQ",
        description: "A young street magician is left to take care of his little sister after his mother's passing and turns to drug dealing in the Los Angeles party scene to keep a roof over their heads. When he gets into trouble with his supplier, his sister is kidnapped and he is forced to rely on both his sleight of hand and brilliant mind to save her.",
        price: "15.99"
    },

    {
        title: "Blade Runner 2049 (2017)",
        poster: "https://image.tmdb.org/t/p/w640/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
        trailer: "https://www.youtube.com/watch?v=dZOaI_Fn5o4",
        description: "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard, a former LAPD blade runner who has been missing for 30 years.",
        price: "15.99"
    },

    {
        title: "Coco (2017)",
        poster: "https://image.tmdb.org/t/p/w640/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg",
        trailer: "https://www.youtube.com/watch?time_continue=1&v=xlnPHQ3TLX8",
        description: "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
        price: "15.99"
    },

    {
        title: "The Shape of Water (2017)",
        poster: "https://image.tmdb.org/t/p/w640/iLYLADGA5oKGM92Ns1j9CDgk3iI.jpg",
        trailer: "https://www.youtube.com/watch?v=XFYWazblaUA",
        description: "An other-worldly story, set against the backdrop of Cold War era America circa 1962, where a mute janitor working at a lab falls in love with an amphibious man being held captive there and devises a plan to help him escape.",
        price: "15.99"
    },

    {
        title: "Pitch Perfect 3 (2017)",
        poster: "https://image.tmdb.org/t/p/w640/hQriQIpHUeh66I89gypFXtqEuVq.jpg",
        trailer: "https://www.youtube.com/watch?v=qZkuyLsN3gM",
        description: "After the highs of winning the world championships, the Bellas find themselves split apart and discovering there aren't job prospects for making music with your mouth. But when they get the chance to reunite for an overseas USO tour, this group of awesome nerds will come together to make some music, and some questionable decisions, one last time.",
        price: "15.99"
    },

    {
        title: "Scott Pilgrim vs. the World (2010)",
        poster: "https://image.tmdb.org/t/p/w640/lafRuPbjEQrrHG9QEaoyV2znZC.jpg",
        trailer: "https://www.youtube.com/watch?time_continue=2&v=7wd5KEaOtm4",
        description: "Scott Pilgrim is a film adaptation of the critically acclaimed, award-winning series of graphic novels of the same name by Canadian cartoonist Bryan Lee O’Malley. Scott Pilgrim is a 23 year old Canadian slacker and wannabe rockstar who falls in love with an American delivery girl, Ramona V. Flowers, and must defeat her seven 'evil exes' to be able to date her.",
        price: "15.99"
    },

    {
        title: "Captain America: The First Avenger (2011)",
        poster: "https://image.tmdb.org/t/p/w640/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
        trailer: "https://www.youtube.com/watch?v=W4DlMggBPvc",
        description: "Predominantly set during World War II, Steve Rogers is a sickly man from Brooklyn who's transformed into super-soldier Captain America to aid in the war effort. Rogers must stop the Red Skull – Adolf Hitler's ruthless head of weaponry, and the leader of an organization that intends to use a mysterious device of untold powers for world domination.",
        price: "15.99"
    }
];



//Seed the database by clearing DB and then addign sample data.
function seedDB() {

    //Clear the database.
    Movie.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed All Movies from Database");

        //Add movies
        // data.forEach(function(seed) {
        //     Movie.create(seed, function(err, movie) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log("Added A movie: " + seed.title)
        //             //add reviews
        //             // Review.create({
        //             //     text: "Review from database. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio odit sequi distinctio quibusdam, quaerat, porro molestias officia quae voluptas dolores similique laborum ad ex qui labore laudantium inventore assumenda aliquid!",
        //             //     author: "SeedFileUser"
        //             // }, function(err, review) {
        //             //     if (err) {
        //             //         console.log(err);
        //             //     } else {
        //             //         movie.reviews.push(review);
        //             //         movie.save();
        //             //         console.log("Added a comment");
        //             //     }
        //             // });
        //         }
        //     });
        // });
    });

    //Clear all reviews
    Review.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Cleared all reviews from database");
        }

    });
}


module.exports = seedDB;