# highlight
<img width="1047" alt="스크린샷 2021-05-28 오후 2 54 24" src="https://user-images.githubusercontent.com/70836357/119936741-9c32c400-bfc4-11eb-86d7-8d9ebd1a3304.png">

먼저 Highlight 테이블에서 필요한 필드들을 추가하였고 pageId와 userId는 각각 Page와 User테이블에 연결해주었습니다.

하나의 row에 한명의 유저가 어떤 페이지에 대해 특정 텍스트를 하이라이팅 하는지에 대한 정보가 들어있습니다.

한 페이지에 대해 여러개의 하이라이팅이 있을 수 있으므로 Page 테이블과 Highlight 테이블을 one to many 관계로 설정하였습니다.

Highlight 테이블에서 입출력 예시에 없는 colorNum을 추가한 이유는 유저가 테마를 변경하면 Highlight 테이블에서 해당하는 유저의 데이터만 찾아 각각의 colorNum을 토대로
Color 테이블에서 num과 변경하는 테마로 colorHex를 찾아 Highlight테이블의 colorHex를 변경하기 위해서입니다.
