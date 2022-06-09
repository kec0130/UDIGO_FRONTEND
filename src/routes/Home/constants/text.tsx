export interface IDescription {
  title: string
  description: JSX.Element | string
}

export const INTRO: IDescription = {
  title: 'AI가 찾아주는 나만의 Place',
  description: (
    <>
      사진 속 장소를 찾아주는 UDIGO로
      <br /> 장소 검색도 스마트하게.
    </>
  ),
}

export const GUIDE: IDescription = {
  title: 'UDIGO 사용 방법',
  description: (
    <>
      검색 탭에서 이미지를 업로드하고 <strong>장소 검색</strong> 버튼을 누르세요. AI가 장소를 추론한 후,{' '}
      <strong>지도에서 찾기</strong> 버튼을 누르면 관련 장소를 지도에서 찾을 수 있어요.
    </>
  ),
}

export const SAMPLE: IDescription = {
  title: '샘플 이미지',
  description:
    'UDIGO가 어떤 장소들을 구분할 수 있는지 궁금하시면 아래 이미지를 다운로드 받아 활용해보세요. 물론, 다른 이미지를 사용하셔도 좋습니다.',
}
