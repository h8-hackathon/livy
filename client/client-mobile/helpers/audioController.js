export const playAudio = async (playback, uri) => {
  try {
    return await playback.loadAsync({ uri }, { shouldPlay: true }, (status) => console.log(status.positionMilis),)
  } catch (error) {
    console.log('something wrong', error.message)
  }
}

export const pauseAudio = async (playback) => {
  try {
    return await playback.setStatusAsync({
      shouldPlay: false
    })
  } catch (error) {
    console.log('something wrong', error.message)
  }
}

export const resumeAudio = async (playback) => {
  try {
    return await playback.setStatusAsync({
      shouldPlay: true
    })
  } catch (error) {
    console.log('something wrong', error.message)
  }
}