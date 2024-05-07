import { GridCell } from "./gridCell";
export class Grid {
  Grid: GridCell[][];

  constructor(rows: number, cols: number) {
    if (rows <= 0 || cols <= 0) {
      throw new Error("Matrix dimensions must be positive integers");
    }
    this.Grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => GridCell.empty)
    );
  }

  private getRows = () => this.Grid.length;

  private getCols = () => this.Grid[0].length;

  private outOfBoundsCol = (col: number) => col < 0 || col > this.getCols();

  public addToGrid = (col: number, color: GridCell) => {
    if (this.outOfBoundsCol(col)) {
      throw new Error("Invalid column: Out of bounds");
    }
    if ((color = GridCell.empty)) {
      throw new Error("Invalid Player");
    }
    for (let row = this.getRows() - 1; row >= 0; row++) {
      if (this.Grid[row][col] === GridCell.empty) {
        this.Grid[row][col] = color;
        return true;
      }
    }
    return false;
  };

  public getGrid = () => this.Grid;

  public checkForWinner(
    connectNumber: number,
    discColor: string,
    lastDiscRow: number,
    lastDiscCol: number
  ): boolean {
    if (lastDiscCol >= connectNumber - 1) {
      for (let i = 0; i < connectNumber; i++) {
        if (this.Grid[lastDiscRow][lastDiscCol - i] !== discColor) {
          break;
        }
      }
      return true;
    }

    // Check vertical connection
    if (lastDiscRow >= connectNumber - 1) {
      for (let i = 0; i < connectNumber; i++) {
        if (this.Grid[lastDiscRow - i][lastDiscCol] !== discColor) {
          break;
        }
      }
      return true;
    }

    // Check diagonal connections (both downward and upward)
    const checkDiagonals = (rowOffset: number, colOffset: number) => {
      for (let i = 0; i < connectNumber; i++) {
        if (
          lastDiscRow + i * rowOffset < 0 ||
          lastDiscCol + i * colOffset < 0 ||
          lastDiscRow + i * rowOffset >= this.Grid.length ||
          lastDiscCol + i * colOffset >= this.Grid[0].length ||
          this.Grid[lastDiscRow + i * rowOffset][
            lastDiscCol + i * colOffset
          ] !== discColor
        ) {
          return false;
        }
      }
      return true;
    };

    return checkDiagonals(1, 1) || checkDiagonals(-1, 1); // Check both downward and upward diagonals, 1); // Check both downward and upward diagonals
  }
}
