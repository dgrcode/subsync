# Subsync 🎬
> ## A tool to synchronize your subtitles

## How to use it
1. In a Terminal, go to the folder where the subs.js file is stored
2. Type `node subs.js`
3. Drag an drop the original unsynchronized srt file into the terminal. Alternatively you can type the path to the file
4. Type a good reference for a marker. In the shape `index::h:m:s,mil`

For example
```
node subs.js /path/to/subtitle.srt 23::0:1:2,300
```

That command will create a file with the same contents as `/path/to/subtitle.srt`, but the marker number 23 will appear at exactly 1 minute, 2 seconds and 300 milliseconds. All markers after 23 will be moved the same amount marker 23 was moved.

## Roadmap

This initial commit was produced after a few hours of work. I don't know when I'll find some more hours to implement more features, but I have a few things in mind.

* Add tests to subs.js
* Add some kind of watermark to the subtitles to show it was synched using this program
* Add a gui to make this program more user friendly
* Support adding more than one marker

## Contributing
PRs are welcome. Please, feel free to open one if you have a working feature

I'd suggest you to open an issue before working on a feature just to avoid multiple people working on the same things. The issues would also be a great place to discuss approaches and solutions to different challenges.

All new code should be covered with tests, and the tests must be in the same PR than the feature code.