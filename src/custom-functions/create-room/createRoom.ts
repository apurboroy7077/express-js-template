import getGamingData from "../../socket/functions/get-gaming-data/getGamingData.js";
import ar7id from "../ar7id/ar7id.js";
import saveGamingData from "../file-system/saveGamingData.js";
import giveRandomQuestion from "../give-random-question/giveRandomQuestion.js";
import roomIdMaker from "../roomIdMaker.ts/roomIdMaker.js";

const createRoom = (roomName: string, playerName: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newRoomId = roomIdMaker();
      const playerId = roomIdMaker();
      const newQuestions = giveRandomQuestion(20);
      const newRoomData: any = {
        roomName: roomName,
        roomId: newRoomId,
        allQuestions: newQuestions,
        currentQuestionData: newQuestions[0],
        usersData: [
          {
            name: playerName,
            id: playerId,
            score: 0,
            lastRequestTimeStamp: Date.now(),
          },
        ],
        creationTime: Date.now(),
      };
      const oldGameData = await getGamingData();
      oldGameData.push(newRoomData);
      await saveGamingData(oldGameData);
      const dataToResolve = {
        roomId: newRoomId,
        playerId: playerId,
      };
      resolve(dataToResolve);
    } catch (error) {
      reject(error);
    }
  });
};

export default createRoom;
//
