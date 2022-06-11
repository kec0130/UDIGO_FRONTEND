const PLACE_BASE_URL = 'https://www.chaechae.site'

export const getPlaceInferenceApi = (formData: FormData) =>
  fetch(`${PLACE_BASE_URL}/api/places/inference/`, {
    method: 'POST',
    body: formData,
  })
