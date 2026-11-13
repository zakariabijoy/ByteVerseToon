export type Cast = "rafi" | "sajid" | "maya" | "manager" | "karim";
export type EyeControl = {
  x: number;
  y: number;
  rx: number;
  ry: number;
  angle: number;
};
export type FaceControl = {
  eyes: [EyeControl, EyeControl];
  mouth: [number, number, number, number];
  cut: number;
  neck: [number, number];
};
const eye = (
  x: number,
  y: number,
  rx: number,
  ry: number,
  angle = 0,
): EyeControl => ({ x, y, rx, ry, angle });
export const faces: Record<Cast, FaceControl[]> = {
  rafi: [
    {
      eyes: [eye(238, 143, 18, 12, -8), eye(301, 136, 15, 12, -5)],
      mouth: [274, 197, 29, 15],
      cut: 274,
      neck: [266, 270],
    },
    {
      eyes: [eye(258, 142, 18, 12, -7), eye(316, 151, 14, 12, 8)],
      mouth: [277, 211, 31, 18],
      cut: 285,
      neck: [257, 278],
    },
    {
      eyes: [eye(262, 146, 19, 14, -7), eye(324, 140, 16, 14, 2)],
      mouth: [305, 214, 25, 18],
      cut: 291,
      neck: [275, 284],
    },
    {
      eyes: [eye(285, 205, 18, 8, 12), eye(341, 216, 14, 8, 14)],
      mouth: [297, 272, 24, 10],
      cut: 332,
      neck: [270, 324],
    },
  ],
  sajid: [
    {
      eyes: [eye(305, 141, 16, 7, 17), eye(358, 160, 12, 6, 15)],
      mouth: [319, 196, 28, 12],
      cut: 288,
      neck: [298, 282],
    },
    {
      eyes: [eye(280, 154, 13, 9, -5), eye(323, 148, 17, 8, -5)],
      mouth: [308, 206, 26, 15],
      cut: 294,
      neck: [324, 286],
    },
    {
      eyes: [eye(307, 144, 16, 7, 18), eye(360, 165, 12, 7, 16)],
      mouth: [323, 203, 28, 12],
      cut: 290,
      neck: [297, 282],
    },
    {
      eyes: [eye(266, 156, 17, 9, 9), eye(325, 168, 15, 8, 10)],
      mouth: [283, 220, 27, 10],
      cut: 299,
      neck: [293, 288],
    },
  ],
  maya: [
    {
      eyes: [eye(275, 160, 20, 12, -10), eye(340, 148, 15, 13, -9)],
      mouth: [321, 211, 27, 12],
      cut: 292,
      neck: [291, 283],
    },
    {
      eyes: [eye(262, 161, 21, 12, -10), eye(319, 148, 15, 13, -9)],
      mouth: [303, 216, 25, 15],
      cut: 296,
      neck: [278, 286],
    },
    {
      eyes: [eye(276, 171, 20, 12, -9), eye(339, 152, 15, 13, -8)],
      mouth: [326, 219, 25, 11],
      cut: 290,
      neck: [294, 281],
    },
    {
      eyes: [eye(271, 152, 20, 12, -8), eye(338, 144, 15, 13, -8)],
      mouth: [316, 202, 27, 11],
      cut: 285,
      neck: [292, 279],
    },
  ],
  karim: [
    {
      eyes: [eye(282, 112, 15, 9, -10), eye(333, 101, 13, 8, -10)],
      mouth: [320, 163, 23, 10],
      cut: 242,
      neck: [290, 234],
    },
    {
      eyes: [eye(252, 110, 15, 9, -10), eye(304, 99, 13, 8, -10)],
      mouth: [290, 163, 24, 12],
      cut: 240,
      neck: [265, 232],
    },
    {
      eyes: [eye(251, 110, 15, 9, -10), eye(302, 98, 13, 8, -10)],
      mouth: [289, 162, 22, 10],
      cut: 240,
      neck: [265, 232],
    },
    {
      eyes: [eye(250, 111, 15, 3, -10), eye(302, 99, 13, 3, -10)],
      mouth: [288, 163, 24, 12],
      cut: 240,
      neck: [265, 232],
    },
  ],
  manager: [
    {
      eyes: [eye(197, 177, 13, 8), eye(256, 177, 15, 8)],
      mouth: [226, 236, 27, 11],
      cut: 302,
      neck: [253, 295],
    },
    {
      eyes: [eye(209, 177, 13, 8), eye(265, 177, 15, 8)],
      mouth: [241, 242, 27, 11],
      cut: 310,
      neck: [266, 302],
    },
    {
      eyes: [eye(222, 187, 13, 8, 10), eye(283, 196, 15, 8, 9)],
      mouth: [245, 253, 26, 10],
      cut: 315,
      neck: [273, 306],
    },
    {
      eyes: [eye(242, 173, 13, 8, 14), eye(297, 189, 15, 8, 15)],
      mouth: [252, 236, 25, 10],
      cut: 306,
      neck: [288, 298],
    },
  ],
};
export type ArmControl = {
  path: string;
  elbow: [number, number];
  sign: number;
  wrist?: [number, number];
  hand?: string;
};
export const speakingArms: Record<Cast, ArmControl[]> = {
  karim: [{ path: "", elbow: [210, 452], sign: -1 }],
  rafi: [
    {
      path: "M155 481 Q230 476 303 435 L359 402 L382 362 L402 337 Q419 331 414 349 L405 382 L457 380 L486 372 Q509 370 503 387 L455 419 L394 442 L315 479 L249 526 Q205 563 178 581 Q157 588 148 561 Q144 524 155 481Z",
      elbow: [177, 542],
      sign: -1,
      wrist: [365, 421],
      hand: "M353 400 L380 360 L402 332 L424 332 L421 373 L460 373 L493 365 L516 377 L506 399 L460 425 L395 451 L353 440Z",
    },
  ],
  sajid: [
    {
      path: "M0 307 L69 302 L118 351 L137 414 L177 484 Q188 519 158 549 Q135 565 111 543 L88 496 L77 430 L0 390Z",
      elbow: [143, 520],
      sign: 1,
      wrist: [85, 416],
      hand: "M0 300 L74 296 L124 351 L134 413 L108 439 L65 430 L0 392Z",
    },
  ],
  maya: [
    {
      path: "M381 482 L423 404 L433 381 L467 357 L493 340 Q513 334 508 355 L492 380 L543 365 L543 438 L479 456 L438 551 Q406 575 391 549 L377 511Z",
      elbow: [399, 530],
      sign: -1,
      wrist: [445, 448],
      hand: "M425 415 L431 380 L467 350 L499 333 L519 341 L503 373 L543 359 L543 440 L485 463 L433 465Z",
    },
    {
      path: "M151 531 L215 505 L269 481 L282 466 Q298 457 294 478 L281 500 L343 520 L365 515 L376 530 L346 552 L279 560 L206 587 Q167 610 149 585Z",
      elbow: [157, 575],
      sign: 1,
    },
  ],
  manager: [
    {
      path: "M0 347 L61 337 L102 378 L118 421 L145 451 L149 486 L127 512 L88 499 L61 456 L0 427Z",
      elbow: [119, 484],
      sign: 1,
      wrist: [92, 445],
      hand: "M0 337 L61 331 L104 372 L120 421 L115 460 L68 470 L0 432Z",
    },
  ],
};
export const skin: Record<Cast, [string, string]> = {
  karim: ["#f9bc78", "#edaa65"],
  rafi: ["#ffc57d", "#ffb86a"],
  sajid: ["#ffbf7a", "#f9b16b"],
  maya: ["#ffcb91", "#ffc17f"],
  manager: ["#f9bf83", "#efac6d"],
};
