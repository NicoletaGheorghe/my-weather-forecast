import {getIcon } from "../getIcon";

describe("getIcon Function", () => {
    test("it returns Clear sky for code 0", () => {
        expect(getIcon(0)).toEqual({label: "Clear sky", icon: "/icons/sun.png"});
    });
    test("it returns Fog for code 45", () => {
        expect(getIcon(45)).toEqual({label: "Fog", icon: "icons/cloudy.png"});
    });
    test("it returns Freezing rain for code 66", () => {
        expect(getIcon(66)).toEqual({label: "Freezing rain", icon: "/icons/freezingRain.png"});
    });
    test("it returns Drizzle for code 57", () => {
        expect(getIcon(57)).toEqual({label: "Drizzle", icon: "/icons/rain.png"});
    });
    test("it returns Rain for code 65", () => {
        expect(getIcon(65)).toEqual({label:"Rain", icon: "/icons/rain.png"});
    });
    test("it returns Snow for code 77", () => {
        expect(getIcon(77)).toEqual({label: "Snow", icon: "/icons/snow.png"});
    });
    test("it returns Snow showers for code 86", () => {
        expect(getIcon(86)).toEqual({label: "Snow showers", icon: "/icons/snow.png"});
    });
    test("it returns Rain showers for code 82", () => {
        expect(getIcon(82)).toEqual({label: "Rain showers", icon: "/icons/rain.png"});
    });
    test("it returns Thunderstorm for code 95", () => {
        expect(getIcon(95)).toEqual({label: "Thunderstorm", icon: "/icons/storm.png"});
    });
})