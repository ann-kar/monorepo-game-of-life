import { Cell } from '../Cell';

describe('Cell', () => {
  it('should return its own state', () => {
    const cell = new Cell(0, 0);
    expect(cell.getState()).toBe(0);
  });

  it('should change state', () => {
    const cell = new Cell(0, 0);
    cell.changeState();
    expect(cell.getState()).toBe(1);
  });

  it('should remain dead when neighbors less or more than 3', () => {
    const cell = new Cell(0, 0);
    cell.tick();
    expect(cell.getState()).toBe(0);
  });

  it('should become alive when it has three alive neighbors', () => {
    const cell = new Cell(0, 3);
    cell.tick();
    expect(cell.getState()).toBe(1);
  });

  it('should stay alive when it has two alive neighbors', () => {
    const cell = new Cell(1, 2);
    cell.tick();
    expect(cell.getState()).toBe(1);
  });
});
