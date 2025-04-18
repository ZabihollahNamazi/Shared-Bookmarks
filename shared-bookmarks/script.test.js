import { getDataAsArray } from "./script.js";

const newData = {
    topic: "Test Topic",
    link: "https://example.com",
    desc: "Test Description",
    createdAt: new Date().toISOString()
  };

test("should return an array", ()=>{
    const arr = getDataAsArray(newData);
    expect(Array.isArray(arr)).toBe(true);
})