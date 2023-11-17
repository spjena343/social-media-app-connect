import axios from "axios";

export const addNotification =
  (recipient, sender, type, post, comment) => async (dispatch) => {
    try {
      dispatch({
        type: "notificationCreateRequest",
      });
 
      const { data } = await axios.post(
        `/api/v1/create/notifications`,
        {
          recipient,
          sender,
          type,
          post,
          comment
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "notificationCreateSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "notificationCreateFailure",
        payload: error.response.data.message,
      });
    }
  };
  export const getNotification =
  () => async (dispatch) => {
    try {
      dispatch({
        type: "notificationGetRequest",
      });

      const { data } = await axios.get(
        `/api/v1/get/notifications`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "notificationGetSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "notificationGetFailure",
        payload: error,
      });
    }
  };
  export const deleteNotification =
  () => async (dispatch) => {
    try {
      dispatch({
        type: "notificationDeleteRequest",
      });

      const { data } = await axios.delete(
        `/api/v1/delete/notifications`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "notificationDeleteSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "notificationDeleteFailure",
        payload: error,
      });
    }
  };

