const PLACE_BASE_URL = 'http://3.35.235.48'

export const getPlaceInferenceApi = (formData: FormData) =>
  fetch(`${PLACE_BASE_URL}/api/places/inference/`, {
    method: 'POST',
    body: formData,
  })
