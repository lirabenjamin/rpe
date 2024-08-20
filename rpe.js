import React, { useState } from 'react';
var rpes = [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5];
var reps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var initialPercentages = [
    [100, 98, 96, 94, 92, 91, 89, 88],
    [96, 94, 92, 91, 89, 88, 86, 85],
    [92, 91, 89, 88, 86, 85, 84, 82],
    [89, 88, 86, 85, 84, 82, 81, 80],
    [86, 85, 84, 82, 81, 80, 79, 77],
    [84, 82, 81, 80, 79, 77, 76, 75],
    [81, 80, 79, 77, 76, 75, 74, 72],
    [79, 77, 76, 75, 74, 72, 71, 69],
    [76, 75, 74, 72, 71, 69, 68, 67],
    [74, 72, 71, 69, 68, 67, 65, 64]
];
export default function OneRMCalculator() {
    var _a = useState(initialPercentages), percentages = _a[0], setPercentages = _a[1];
    var _b = useState(100), oneRM = _b[0], setOneRM = _b[1];
    var recalculatePercentages = function (newOneRM) {
        return initialPercentages.map(function (row) {
            return row.map(function (cell) { return Math.round((cell / 100) * newOneRM); });
        });
    };
    var handleCellChange = function (rowIndex, colIndex, value) {
        var percentage = initialPercentages[rowIndex][colIndex];
        var newOneRM = Math.round((value / percentage) * 100);
        setOneRM(newOneRM);
        setPercentages(recalculatePercentages(newOneRM));
    };
    return (React.createElement("div", { style: { padding: '1rem' } },
        React.createElement("h1", { style: { fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' } }, "Interactive 1RM Calculator"),
        React.createElement("p", { style: { marginBottom: '1rem' } },
            "Estimated 1RM: ",
            oneRM,
            " lbs"),
        React.createElement("table", { style: { borderCollapse: 'collapse', width: '100%' } },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { style: { border: '1px solid #ddd', padding: '8px' } }, "Reps"),
                    rpes.map(function (rpe) { return (React.createElement("th", { key: rpe, style: { border: '1px solid #ddd', padding: '8px' } },
                        "RPE ",
                        rpe)); }))),
            React.createElement("tbody", null, percentages.map(function (row, rowIndex) { return (React.createElement("tr", { key: rowIndex },
                React.createElement("td", { style: { border: '1px solid #ddd', padding: '8px' } }, reps[rowIndex]),
                row.map(function (cell, colIndex) { return (React.createElement("td", { key: colIndex, style: { border: '1px solid #ddd', padding: '8px' } },
                    React.createElement("input", { type: "number", value: cell, onChange: function (e) { return handleCellChange(rowIndex, colIndex, parseInt(e.target.value)); }, style: { width: '100%', padding: '4px', boxSizing: 'border-box' } }))); }))); })))));
}
