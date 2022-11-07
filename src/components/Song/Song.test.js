import SongCSS from "./Song.module.css";

const Song = require('./Song.jsx');

describe("giveCss", () => {
	test("song is editable", () => {
		expect(Song.giveCss(true)).toBe(SongCSS.hasCross);
	});

	test("song is not editable", () => {
		expect(Song.giveCss(false)).toBe("");
	});
});