export const arrangeTable = (playingUsers) => {
  let TOP = 3;
  let DOWN = 3;
  let LEFT = 1;
  let RIGHT = 1;

  const arrTop = [];
  const arrBottom = [];
  const arrLeft = [];
  const arrRight = [];

  arrBottom.push(playingUsers[0]);
  DOWN -= 1;

  playingUsers.forEach((user, index) => {
    if (index === 0) return;

    if (TOP || DOWN) {
      if (TOP >= DOWN) {
        arrTop.push(user);
        TOP -= 1;
      } else if (TOP < DOWN) {
        arrBottom.push(user);
        DOWN -= 1;
      }
    } else if (LEFT === RIGHT) {
      arrLeft.push(user);
      LEFT -= 1;
    } else if (LEFT < RIGHT) {
      arrRight.push(user);
      RIGHT -= 1;
    }

    if (!TOP && !DOWN && !LEFT && !RIGHT) {
      TOP = 2;
      DOWN = 2;
      LEFT = 1;
      RIGHT = 1;
    }
  });

  return {
    arrTop, arrBottom, arrLeft, arrRight,
  };
};
