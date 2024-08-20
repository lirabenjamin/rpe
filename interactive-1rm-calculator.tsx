import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const rpes = [10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5];
const reps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const initialPercentages = [
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
  const [percentages, setPercentages] = useState(initialPercentages);
  const [oneRM, setOneRM] = useState(100);

  const recalculatePercentages = (newOneRM) => {
    return initialPercentages.map(row => 
      row.map(cell => Math.round((cell / 100) * newOneRM))
    );
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const percentage = initialPercentages[rowIndex][colIndex];
    const newOneRM = Math.round((value / percentage) * 100);
    setOneRM(newOneRM);
    setPercentages(recalculatePercentages(newOneRM));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Interactive 1RM Calculator</h1>
      <p className="mb-4">Estimated 1RM: {oneRM} lbs</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reps</TableHead>
            {rpes.map(rpe => (
              <TableHead key={rpe}>RPE {rpe}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {percentages.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>{reps[rowIndex]}</TableCell>
              {row.map((cell, colIndex) => (
                <TableCell key={colIndex}>
                  <Input
                    type="number"
                    value={cell}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, parseInt(e.target.value))}
                    className="w-full"
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
