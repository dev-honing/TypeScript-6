// CSR-fetch.ts

// Props라는 type 선언을 통해
// 반드시 문자열로만 구성된 객체를 전달받아야 함을 명시함
type Props = {
  [key: string]: string;
};

// Promise<HTMLElement> 리턴이 Promise 객체를 반환한다는 의미,
// <꺽쇠> 표기는 제네릭 문법으로, '할당'할 때에 결정한다.
// HTMLElement는 따로 타입을 지정하지 않았지만, 기본적으로 제공되는 타입이다.

// 따라서, 함수 fetchExample()은 HTMLElement 무언가를 Promise 객체로 핸들링한다는 뜻이며,
// async와 함께 사용한 것을 통해 Promise 객체를 동기적으로 작성된 코드처럼 작동시킨다.
// fetch()는 기본적으로 비동기적으로 작동하기 때문에 비동기 상태로 그냥 두면,
// (통신상태에 따라) 아래의 HTML component 생성하는 부분보다 먼저 실행될 수 있다.

// HTML 요소를 생성하고 속성을 설정하며, 데이터를 가져와 컴포넌트를 업데이트하는 비동기 함수
async function fetchExample(tagName: string, props: Props, children: string, url: string): Promise<HTMLElement> {
  // HTML 요소 생성
  const element = document.createElement(tagName);

  // Props 설정
  for (const key in props) {
    element.setAttribute(key, props[key]);
  }

  // 초기 내용 설정
  element.innerHTML = children;

  try {
    // Fetch API를 사용해 데이터 가져오기
    // 위 함수 선언부에서 async 키워드를 사용했기 때문에, fetchExample() 함수는 await 키워드를 사용할 수 있다.
    const response = await fetch(url);

    // 통신이 성공하면
    if (!response.ok) { // AJAX 통신의 일반적인 객체 구조에서 ok 속성을 사용한 예시
      throw new Error(`통신 상태 불량: ${response.status}`);
    }

    // 위 fetch() await 키워드 때문에 아래 data라는 변수의 chunks는 Promise 객체가 되며,
    // 동기적으로 작성된 코드처럼 작동한다.
    const data = await response.json();

    // 가져온 데이터로 컴포넌트를 업데이트
    element.innerHTML = JSON.stringify(data, null, 2);
  } catch (error) { // try 구문이 실패했을 때는 통신상태 불량일 확률이 상당히 높다.
    console.error('Fetch error:', error);

    // 실패 시, 메시지 업데이트
    element.innerHTML = "아직 데이터가 수신되지 않았습니다.";
  }

  // Promise 객체 반환
  return element;
}

// 사용 예시
// HTML 문서에서 위 코드를 불러오거나, 작성했다고 가정한다.
const root = document.getElementById('root');

fetchExample('div', {class: 'example'}, '로딩 중', 'http://my.server.localhost/directory')
  .then((div) => {
    root?.appendChild(div);
  })
  .catch((error) => {
    console.error('catch 구문 error 매개변수 인자가 전달됨: ', error);
  });
