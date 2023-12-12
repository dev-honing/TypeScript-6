// CSR-fetch.ts

// Props라는 type 선언을 통해
// 반드시 문자열로만 구성된 객체를 전달받아야 함을 명시함

type Props = {
  [key: string]: string;
};

async function fetchExample(tagName: string, props: Props, children: string, url: string): Promise<HTMLElement> {
  // HTML 요소 생성
  const element = document.createElement(tagName);

  // Props 설정
  for (const key in props) {
    element.setAttribute(key, props[key]);
  }

  // 초기 내용 설정
  element.innerHTML = children;

  return element;
}