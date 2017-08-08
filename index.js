// nowplayingbot

let fetch = require('node-fetch');
let Masto = require('mastodon');
let search = require('youtube-search');

let tootLab = new Masto({
	access_token: process.env.MASTODON_ACCESS_TOKEN,
	api_url: process.env.MASTODON_API_URL
});

var now_playing = { title: "", artist: "", url: "" };

let checkWhatIsPlaying = () => {
	fetch('https://libre.fm/2.0/?method=user.getrecenttracks&user=' + process.env.LIBRE_FM_USERNAME + '&page=1&limit=1&format=json')
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			throw new Error(response);
		}).then((responseJson) => {
			let newTrack = Array.isArray(responseJson.recenttracks.track) ? responseJson.recenttracks.track[0]: responseJson.recenttracks.track;
			let track = {
				title: newTrack.name,
				artist: newTrack.artist["#text"],
				url: newTrack.url
			};

			if (track.artist == now_playing.artist && track.title == now_playing.title) {
				console.log('Same song - skipping new announcement.');
			} else {
				console.log('New song - announcing!');

				// try and look up track on youtube naively
				let searchquery = track.artist + " " + track.title;
				let searchopts = { maxResults: 1, key: process.env.YOUTUBE_API_KEY }
		
				search(searchquery, searchopts, (err, results) => {
					now_playing = track;
					console.log('now_playing is now ' + JSON.stringify(now_playing));
					console.log('YT search results:');
					console.dir(results);
					var videoUrl = results[0].link;
					var newstatus = ':musical_note: #nowplaying #np #tootlabradio :musical_note:' + "\n\n";
					newstatus += track.artist + ' - "' + track.title + '"' + "\n\n";

					if (videoUrl.length > 0) {
						newstatus += videoUrl + "\n\n";
					}

					newstatus += ':notes: ' + now_playing.url + ' :notes:';

					console.log('newstatus:');
					console.log(newstatus);
				
					tootLab.post('statuses', { "status": newstatus, "visibility": "public" }, (err, data, tootResponse) => {
						if (err) {
							console.log('ERROR FROM TOOT-LAB:');
							console.dir(err);
						} else {
							console.log('===================');	
						}

					});
				});
			}
			console.log('Sleeping for a minute.');	
			setTimeout(checkWhatIsPlaying, 1000 * 60 * 1);

		}).catch((err) => {
			console.log('Failed to get now playing from libre.fm - ' + JSON.stringify(err));
			setTimeout(checkWhatIsPlaying, 1000 * 15 * 1);
		});
};

console.log('Kicking off this bot action...');
checkWhatIsPlaying();

