// 질문: 보기마다 MBTI 글자 하나를 가리킨다.
const QUESTIONS = [
  {
    text: "여행 첫날 저녁, 더 끌리는 건?",
    options: [
      { label: "사람들로 북적이는 야시장이나 펍", letter: "E" },
      { label: "숙소 근처 조용한 골목 산책", letter: "I" },
    ],
  },
  {
    text: "여행지를 고를 때 나는?",
    options: [
      { label: "후기 많고 검증된 명소가 좋다", letter: "S" },
      { label: "분위기와 이야기가 있는 낯선 곳이 좋다", letter: "N" },
    ],
  },
  {
    text: "친구들과 식당을 고를 때 나는?",
    options: [
      { label: "평점과 가격을 비교해서 효율적으로", letter: "T" },
      { label: "다 같이 기분 좋게 먹을 수 있는 곳으로", letter: "F" },
    ],
  },
  {
    text: "여행 계획은 어떻게 세워?",
    options: [
      { label: "시간 단위로 일정표를 짠다", letter: "J" },
      { label: "큰 틀만 정하고 그때그때 정한다", letter: "P" },
    ],
  },
  {
    text: "여행 중 가장 충전되는 순간은?",
    options: [
      { label: "새로운 사람들과 어울릴 때", letter: "E" },
      { label: "혼자 풍경을 보며 생각할 때", letter: "I" },
    ],
  },
];

// MBTI 유형별 추천 도시
const CITIES = {
  ESTJ: {
    name: "서울", country: "대한민국",
    intro: "궁궐과 한옥 골목, 한강까지 하루에 효율적으로 돌 수 있는 도시. 지하철만으로 어디든 갈 수 있어 계획대로 움직이기 좋아요.",
    todos: ["경복궁에서 근정전과 경회루 둘러보기", "북촌 한옥마을 골목 걷기", "한강공원에서 해 질 녘 산책하기"],
    photo: { file: "seoul.jpg", artist: "서울관광 아카이브", license: "공공누리 제1유형", page: "https://commons.wikimedia.org/wiki/File:%EA%B4%91%ED%99%94%EB%AC%B8_%EC%9B%94%EB%8C%80.jpg" },
  },
  ISTJ: {
    name: "경주", country: "대한민국",
    intro: "천 년 신라의 유적이 도시 곳곳에 남아 있는 곳. 순서대로 차근차근 둘러보는 역사 여행에 딱이에요.",
    todos: ["불국사에서 석가탑과 다보탑 보기", "첨성대와 대릉원 고분군 걷기", "동궁과 월지 야경 감상하기"],
    photo: { file: "gyeongju.jpg", artist: "작자 미상", license: "퍼블릭 도메인", page: "https://commons.wikimedia.org/wiki/File:Lotus_Flower_Bridge_and_Seven_Treasure_Bridge_at_Bulguksa_in_Gyeongju,_Korea.jpg" },
  },
  ISFJ: {
    name: "전주", country: "대한민국",
    intro: "한옥 지붕이 이어진 마을과 따뜻한 음식이 있는 도시. 대부분 걸어서 돌아볼 수 있어 편안한 여행이 돼요.",
    todos: ["이른 아침 한옥마을 골목 산책하기", "경기전과 전동성당 둘러보기", "남부시장 야시장에서 길거리 음식 맛보기"],
    photo: { file: "jeonju.jpg", artist: "Bernard Gagnon", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Jeonju_Hanok_Maeul_02.jpg" },
  },
  ISFP: {
    name: "제주", country: "대한민국",
    intro: "바다, 오름, 돌담길이 어우러진 섬. 마음 가는 대로 걷다 멈추며 풍경을 즐기기 좋아요.",
    todos: ["성산일출봉에서 일출 보기", "새별오름이나 용눈이오름 오르기", "올레길 한 코스 천천히 걷기"],
    photo: { file: "jeju.jpg", artist: "Korea.net / Korean Culture and Information Service", license: "CC BY-SA 2.0", page: "https://commons.wikimedia.org/wiki/File:Seongsan_Ilchulbong_from_the_air.jpg" },
  },
  ISTP: {
    name: "강릉", country: "대한민국",
    intro: "서울에서 KTX로 약 1시간 30분. 바다와 커피, 고택까지 짧은 시간에 알차게 즐길 수 있어요.",
    todos: ["안목해변 커피거리에서 바다 보며 커피 마시기", "경포해변에서 일출 보기", "율곡 이이의 생가 오죽헌 둘러보기"],
    photo: { file: "gangneung.jpg", artist: "Mobius6", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Gyeongpo_Beach_20220502_023.jpg" },
  },
  ESFP: {
    name: "부산", country: "대한민국",
    intro: "해변, 야경, 시장의 활기가 한 도시에. 밤까지 신나게 놀기 좋은 곳이에요.",
    todos: ["광안리에서 광안대교 야경 보기", "감천문화마을 알록달록 골목에서 사진 찍기", "자갈치시장에서 해산물 먹기"],
    photo: { file: "busan.jpg", artist: "Bl00dnFl4mes", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Gamcheon_Houses,_2024.jpg" },
  },
  ESTP: {
    name: "방콕", country: "태국",
    intro: "화려한 사원과 강, 시장이 쉴 새 없이 이어지는 도시. 직접 부딪히며 즐기는 여행에 어울려요.",
    todos: ["왕궁과 왓 포의 와불상 보기", "짜오프라야강 건너 왓 아룬 오르기", "아침 일찍 수상시장 구경하기"],
    photo: { file: "bangkok.jpg", artist: "Mastertongapollo", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:%E0%B9%80%E0%B8%88%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B9%8C%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%98%E0%B8%B2%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%84%E0%B9%8C%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%AD%E0%B8%A3%E0%B8%B8%E0%B8%932.jpg" },
  },
  ESFJ: {
    name: "오사카", country: "일본",
    intro: "'일본의 부엌'이라 불릴 만큼 먹거리가 많은 도시. 친구들과 함께 나눠 먹으며 다니기 좋아요.",
    todos: ["밤에 도톤보리 네온사인 아래 타코야키 먹기", "구로몬시장에서 아침 먹거리 투어하기", "오사카성 공원 산책하기"],
    photo: { file: "osaka.jpg", artist: "Type specimen", license: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Osaka_Dotonbori_Ebisu_Bridge.jpg" },
  },
  ENFP: {
    name: "바르셀로나", country: "스페인",
    intro: "가우디의 상상력이 거리마다 살아 있는 도시. 어디를 걸어도 새로운 영감이 떠올라요.",
    todos: ["사그라다 파밀리아 성당 들어가 보기", "구엘 공원 언덕에서 모자이크와 전망 즐기기", "고딕 지구 골목과 보케리아 시장 걷기"],
    photo: { file: "barcelona.jpg", artist: "Canaan", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:SF_maig_2_cropped.jpg" },
  },
  ENFJ: {
    name: "리스본", country: "포르투갈",
    intro: "언덕 위 노란 트램과 파두 음악이 흐르는 도시. 함께 간 사람들과 따뜻한 추억을 남기기 좋아요.",
    todos: ["28번 트램 타고 옛 시가지 둘러보기", "벨렝에서 원조 에그타르트 맛보기", "알파마 지구에서 파두 공연 들으며 저녁 먹기"],
    photo: { file: "lisbon.jpg", artist: "Alvesgaspar", license: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Torre_Bel%C3%A9m_April_2009-4a.jpg" },
  },
  ENTP: {
    name: "뉴욕", country: "미국",
    intro: "예술, 공연, 사람이 끊임없이 섞이는 도시. 새로운 자극을 찾는 사람에게 지루할 틈이 없어요.",
    todos: ["센트럴파크에서 보트 타거나 피크닉하기", "브로드웨이 뮤지컬 한 편 보기", "브루클린 브리지 걸어서 건너기"],
    photo: { file: "newyork.jpg", artist: "Anthony Quintano", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Global_Citizen_Festival_Central_Park_New_York_City_from_NYonAir_(15351915006).jpg" },
  },
  ENTJ: {
    name: "싱가포르", country: "싱가포르",
    intro: "깔끔하고 효율적인 미래 도시. 짧은 일정에도 볼거리와 먹거리를 빈틈없이 챙길 수 있어요.",
    todos: ["가든스 바이 더 베이 클라우드 포레스트 둘러보기", "밤에 슈퍼트리 무료 조명 쇼 보기", "호커센터에서 사테와 치킨라이스 먹기"],
    photo: { file: "singapore.jpg", artist: "Shiny Things.", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Supertree_Grove,_Gardens_by_the_Bay,_Singapore_-_20120712-02.jpg" },
  },
  INFP: {
    name: "교토", country: "일본",
    intro: "오래된 사찰과 대나무 숲, 찻집이 있는 고요한 도시. 혼자 생각에 잠기며 걷기 좋아요.",
    todos: ["이른 아침 후시미 이나리 신사의 붉은 도리이 길 걷기", "아라시야마 대나무 숲 산책하기", "기요미즈데라와 산넨자카 골목 둘러보기"],
    photo: { file: "kyoto.jpg", artist: "Basile Morin", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine,_Kyoto,_Japan.jpg" },
  },
  INFJ: {
    name: "프라하", country: "체코",
    intro: "중세의 이야기가 그대로 남은 도시. 해 질 녘 다리 위에서 조용히 의미를 곱씹기 좋아요.",
    todos: ["해 질 녘 카를교 건너기", "구시가지 광장에서 천문시계 정각 공연 보기", "프라하성과 황금소로 둘러보기"],
    photo: { file: "prague.jpg", artist: "DXR", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:North_view_of_Charles_Bridge_from_M%C3%A1nes%C5%AFv_most,_Prague_20160808_1.jpg" },
  },
  INTP: {
    name: "베를린", country: "독일",
    intro: "역사와 예술, 실험적인 문화가 공존하는 도시. 궁금한 것을 깊이 파고들기 좋아요.",
    todos: ["박물관 섬에서 네페르티티 흉상 보기", "이스트사이드 갤러리 벽화 따라 걷기", "베를린 대성당 돔에 올라 시내 내려다보기"],
    photo: { file: "berlin.jpg", artist: "Thomas Wolf, www.foto-tw.de", license: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:Brandenburger_Tor_abends.jpg" },
  },
  INTJ: {
    name: "레이캬비크", country: "아이슬란드",
    intro: "화산과 폭포, 온천이 가까운 북쪽 끝 도시. 치밀하게 계획해 대자연을 탐험하기 좋아요.",
    todos: ["골든 서클에서 간헐천과 굴포스 폭포 보기", "블루라군 온천에서 쉬기", "할그림스키르캬 교회 전망대 오르기"],
    photo: { file: "reykjavik.jpg", artist: "Steinninn", license: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:Hallgrimskirkja_mai_2026.jpg" },
  },
};
