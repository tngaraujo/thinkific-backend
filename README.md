# Thinkific Vanhackathon Challenge (Back-end)

This is the back-end for project https://github.com/tngaraujo/thinkific. The back-end runs on port 3000 and supports the application.

This project was developed for Vanhackthon (Apr 2017) - Thinkific Challenge (Choose your own Adventure Video Maker).
It is a interactive video Manager which allows to create questions and answers to be displayed on top of a Youtube videos.
Multiple videos may be added with their questions at specific required times.
Please also download the Back-end for this project (https://github.com/tngaraujo/thinkific-backend) which should be running in the same machine.

The following requirements were met:

1. Should work with videos that are hosted on a site like Wistia or Youtube

2. Should allow creators to prompt viewers with a question

3. Prompt should be possible at any video time specified by the creator (etc. 2min 30s of a

6 minute video)

4. Prompt should allow space for a question, and between 2 and 6 text responses

5. For each response, the behavior can be to resume playback, or link to another URL

6. Prompt and responses overlaid on video.

7. The interactive video link can be embedded into another page using HTML and a simple

## Technology used
Angular2, Express, NodeJS, SQLite3, JSON, CSS, 

## Running
Install depencies: `npm install express body-parser deasync sqlite3`
Simply run `node thinkific.js` and back-end will be running in port 3000.
The back-end should be running in the same machine (please download at https://github.com/tngaraujo/thinkific-backend).
