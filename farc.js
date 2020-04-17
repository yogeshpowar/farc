/*
 * FARC : Free Array Rank Coloring.
 *
 * Following program colors element in the `arr` according to
 * its rank.
 * Its a red shed with
 *     min as #FFE0E0
 *     avg as #FF0000
 *     max as #800000
 * This generates a html file which can be viewed in any decent
 * browser to show the element in array and it corresponding
 * color code.
 *
 * Copyright (C) 2020 <Yogesh Ashok Powar <yogesh.powar@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 * See <https://www.gnu.org/licenses/>.
 */
var arr = [3, 1, 9, 5, 17, 42, 22, 40, 85, 12, 8, 28, 4, 18, 21, 15];
//var arr = [1, 0, 1, 0, 3, 5, 2, 15, 1, 3, 1, 3, 0, 5, 3, 2];
var sorted = arr.slice().sort((a,b) => b-a)
var ranks = arr.slice().map(v => sorted.indexOf(v) + 1);
var uniq = ranks.filter((v, i, self) => self.indexOf(v) === i)
           .sort((a, b) => a - b);;
var step = Math.round(255/uniq.slice(-1)[0]);
let max = ranks.reduce((a, b) => Math.max(a, b));
console.log("<html><body>");
console.log("<table>");
arr.map((e, i) => {
    let r = ranks[i];
    let avgR = uniq.slice(-1)[0]/2;
    if (r < avgR ) {
        gb = r * step;
        gb += 127;
        gb = gb.toString(16);
        gb = gb + "0000";
    } else if ( r > avgR) {
        gb = (max - r) * step;
        gb = (127 - gb) * 2;
        gb = gb.toString(16);
        gb = "FF" + gb + gb;
    } else {
        gb = "FF0000";
    }
    gb = "#" + gb.toUpperCase();
    console.log("<tr><td bgcolor='" + gb + "'>" + arr[i] + "</td><td><font color='" + gb + "'>" + gb + "</font></td></tr>");
});
console.log("</table>");
console.log("</body></html>");
