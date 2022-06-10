const PLACE_BASE_URL = 'http://54.180.140.141'

export const getPlaceInferenceApi = (formData: FormData) =>
  fetch(`${PLACE_BASE_URL}/api/places/inference/`, {
    method: 'POST',
    body: formData,
  })
