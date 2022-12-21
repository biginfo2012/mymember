import {
  api_endWork,
  api_startWork,
  api_updateWork,
  getCurrentWork,
} from "./utils";

let isStart = false;
let duration = 0;
let stream = {};

export const set_work_status = (isWork) => {
  return (dispatch) => {
    dispatch({
      type: "SET_WORK_STATUS",
      payload: isWork,
    });
  };
};

export const setProject = (project) => {
  return (dispatch) => {
    dispatch({
      type: "SET_PROJECT",
      payload: project,
    });
  };
};

export const setStream = (stream) => {
  return (dispatch) => {
    dispatch({
      type: "SET_STREAM",
      payload: stream,
    });
  };
};

export const setDuration = (duration) => {
  return (dispatch) => {
    dispatch({
      type: "SET_DURATION",
      payload: duration,
    });
  };
};

export const startWork = async (
  userId,
  description,
  set_work_status,
  setDuration
) => {
  const canvas = document.getElementById("canvas");
  const videos = document.getElementById("videos");
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: false,
  });
  videos.srcObject = stream;
  isStart = true;
  duration = 0;
  set_work_status(true);
  await api_startWork(userId, description);
  await run(stream, setDuration, set_work_status);
};

export const endWork = async (set_work_status, setDuration) => {
  const videos = document.getElementById("videos");
  duration = 0;
  isStart = false;
  set_work_status(false);
  setDuration(false);

  // Send end api
  await api_endWork(getCurrentWork()._id);

  // Close all the stream.
  let tracks = stream?.getTracks();
  tracks?.forEach((track) => track.stop());
  if (videos) videos.src = null;
  localStorage.setItem("currentWork", "");
};

const run = async (stream, setDuration) => {
  // Return if user end working
  if (!isStart) return;

  // Return if stream is disconnected
  if (!stream?.active) {
    const videos = document.getElementById("videos");
    set_work_status(false);
    await api_endWork(getCurrentWork()._id);
    duration = 0;
    setDuration(0);

    // Close all the stream.
    let tracks = stream?.getTracks();
    tracks?.forEach((track) => track.stop());
    if (videos) videos.src = null;
    localStorage.setItem("currentWork", "");
    return;
  }

  duration++;
  setDuration(duration);

  const canvas = document.getElementById("canvas");
  const imageCapture = new window.ImageCapture(stream?.getVideoTracks()[0]);

  if (
    !(
      imageCapture.track.readyState != "live" ||
      !imageCapture.track.enabled ||
      imageCapture.track.muted
    )
  ) {
    const frame = await imageCapture.grabFrame();
    var ctx = canvas.getContext("2d");
    const screenshot = canvas.toDataURL();
    const image = document.getElementById("image");
    // imageRef.current.src = screenshot;
    if (screenshot) {
      image.src = screenshot;
      await api_updateWork(getCurrentWork()._id, screenshot);
    }
    if (canvas) ctx?.drawImage(frame, 0, 0, canvas.width, canvas.height);
  }

  setTimeout(() => {
    run(stream, setDuration, set_work_status);
  }, 1000);
};
