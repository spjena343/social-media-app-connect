import axios from 'axios';

export const chatWithAi = (input) => async (dispatch) => {
  try {
    dispatch({
      type: "chatWithAiCreateRequest",
    });
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=' +process.env.PALM_AI_KEY,
      {
        prompt: {
          text:input,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch({
      type: "chatWithAiCreateSuccess",
      payload: response.data,
    });
  } catch (error) {
    console.error("Error during chatWithAi:", error);

    if (error.response) {
      console.error("Response data:", error.response.data);
    }

    dispatch({
      type: "chatWithAiCreateFailure",
      payload: error,
    });
  }
};

//AIzaSyD4yed2x2DYnn_QD0szY18h92Pa7UKa0dw