nowplayingbot
=============

This is a very simple, very naive bot for sharing what songs a user is listening to on [Mastodon](https://joinmastodon.org) by monitoring new scrobbles to that user's [libre.fm](https://libre.fm) account.

## prerequisites 

* a libre.fm account 
* a Mastodon account
* a YouTube API key

## how to use

Either remix this on Glitch or git clone it or something.

The following information will need to be entered in a file called `.env` in the same location as index.js:

* **MASTODON_ACCESS_TOKEN**: this is the access token for your bot. If you do not already have an access token for your bot _on the Mastodon server you specify below_ then you can use the tool graciously provided at [http://tinysubversions.com/notes/mastodon-bot/](http://tinysubversions.com/notes/mastodon-bot/) by [Darius Kazemi](https://social.tinysubversions.com/@darius) to generate the credentials your bot will need.

* **MASTODON_API_URL**: this is the base URI for accessing the Mastodon server's API endpoints (for example, my endpoint in the toot-lab is "https://toot-lab.reclaim.technology/api/v1/").

* **LIBRE_FM_USERNAME**: username for the libre.fm account you would like to monitor for new scrobbles (for example, my libre.fm username is "djsundog").

* **YOUTUBE_API_KEY**: the bot will search the YouTube API for a video matching the artist and title for the song that was scrobbled. You will need an API key from YouTube in order for this to work. You can get a YouTube API key by following the steps at [https://developers.google.com/youtube/registering_an_application#Create_API_Keys](https://developers.google.com/youtube/registering_an_application#Create_API_Keys).

You can compare your `.env` file's contents to the `.env.sample` file to ensure you have the right information in the right place.



