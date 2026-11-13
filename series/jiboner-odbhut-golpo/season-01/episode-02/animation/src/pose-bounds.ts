import type { Cast } from "./rig-data";
// Alpha-connected artwork extents in the original atlas. Several raised hands
// cross an equal-width cell boundary; those cells must never be cropped blindly.
const bounds: Record<Cast, number[][]> = {
  karim: [
    [114, 467],
    [606, 1000],
    [1189, 1548],
    [1725, 2079],
  ],
  rafi: [
    [41, 458],
    [582, 1051],
    [1135, 1548],
    [1681, 2104],
  ],
  sajid: [
    [44, 483],
    [512, 1112],
    [1156, 1611],
    [1714, 2149],
  ],
  maya: [
    [43, 493],
    [558, 1124],
    [1144, 1577],
    [1680, 2143],
  ],
  manager: [
    [48, 476],
    [500, 1073],
    [1151, 1572],
    [1684, 2137],
  ],
};
export const poseBounds = (who: Cast, pose: number) => ({
  x: bounds[who][pose][0] - 543 * pose - 4,
  width: bounds[who][pose][1] - bounds[who][pose][0] + 8,
});
