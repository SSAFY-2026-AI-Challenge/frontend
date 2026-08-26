# Fin Edu

<div align="center">

<img width="329" alt="Fin Edu Preview" src="https://placehold.co/329x220?text=Fin+Edu">

</div>

# Fin Edu Frontend

> **금융 AI 기반 교육 서비스 Frontend**
> **개발기간: 2026.08 ~**

## 배포 주소

> **개발 버전** : localhost
> **프론트 서버** : localhost
> **백엔드 서버** : localhost

---

## 프로젝트 소개

Fin Edu의 프론트엔드 프로젝트입니다.

Next.js App Router와 TypeScript를 기반으로 구성하며,
서버 상태 관리는 TanStack Query, 클라이언트 전역 상태 관리는 Zustand를 사용합니다.

API 통신은 Fetch API, 스타일링은 Tailwind CSS를 사용하며 배포는 Vercel을 통해 진행합니다.

---

## 시작 가이드

### Requirements

프로젝트 실행을 위해 다음 환경이 필요합니다.

* Node.js
* npm

### Installation

```bash id="13vmo3"
git clone <repository-url>
cd <project-directory>

npm install
npm run dev
```

---

## Scripts

1. 개발 서버 실행

```bash id="jst6qt"
npm run dev
```

2. Production build 생성

```bash id="u6nyxf"
npm run build
```

3. Production server 실행

```bash id="hy8lgv"
npm run start
```

4. ESLint 검사

```bash id="9w1m1s"
npm run lint
```

5. Prettier 코드 포맷팅

```bash id="hlydfq"
npm run format
```

6. Prettier 규칙 준수 여부 확인

```bash id="xsbghp"
npm run format:check
```

---

## Stacks 🔨

### Environment

![Cursor](https://img.shields.io/badge/Cursor-000000?style=for-the-badge\&logo=cursor\&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge\&logo=git\&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge\&logo=github\&logoColor=white)

### Config

![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge\&logo=npm\&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge\&logo=eslint\&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge\&logo=prettier\&logoColor=black)

### Development

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=next.js\&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge\&logo=react-query\&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-433E38?style=for-the-badge\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)

### Deployment

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge\&logo=vercel\&logoColor=white)

### Communication

![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge\&logo=slack\&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge\&logo=discord\&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge\&logo=notion\&logoColor=white)
![Google Meet](https://img.shields.io/badge/Google%20Meet-00897B?style=for-the-badge\&logo=googlemeet\&logoColor=white)

---

## 화면 구성 📺

현재 화면은 추후 업데이트 예정입니다.

|                                메인 페이지                                |                                주요 기능 페이지                                |
| :------------------------------------------------------------------: | :---------------------------------------------------------------------: |
| <img width="329" src="https://placehold.co/329x220?text=Main+Page"/> | <img width="329" src="https://placehold.co/329x220?text=Feature+Page"/> |

---

## 주요 기능 📦

주요 기능은 구현 이후 업데이트 예정입니다.

---

## 프론트엔드 아키텍처 🏗️

### 구조

프론트엔드는 Next.js App Router를 기반으로 구성합니다.

`app` 디렉터리는 라우팅과 페이지 조합을 담당하고,
도메인별 기능은 `features` 디렉터리에서 관리합니다.

공통 UI 컴포넌트와 기능별 컴포넌트를 분리하여 관리하며,
API 요청 로직과 TanStack Query Hook 역시 기능 단위로 분리합니다.

서버 상태와 클라이언트 상태의 역할을 분리하여
서버 데이터는 TanStack Query, 전역 클라이언트 상태는 Zustand를 통해 관리합니다.

### Data Flow

서버 데이터는 다음과 같은 흐름으로 관리합니다.

```text id="3y8dm1"
Page / Component
       ↓
TanStack Query Hook
       ↓
Feature API
       ↓
Common Fetcher
       ↓
Backend API
```

API 통신은 Fetch API를 기반으로 구성하며,
공통 요청 처리는 `lib/api/fetcher.ts`에서 담당합니다.

각 기능에서는 공통 Fetcher를 기반으로 API 함수를 정의하고,
TanStack Query Hook을 통해 페이지와 컴포넌트에서 사용합니다.

클라이언트 전역 상태는 다음과 같이 관리합니다.

```text id="63zdxr"
Page / Component
       ↕
Zustand Store
```

---

## State Management

상태의 성격에 따라 관리 방식을 구분합니다.

| 상태                  | 관리 방법            |
| ------------------- | ---------------- |
| Server State        | TanStack Query   |
| Shared Client State | Zustand          |
| Local UI State      | React `useState` |

### TanStack Query

백엔드 API를 통해 받아오는 서버 상태를 관리합니다.

* API 데이터 캐싱
* 서버 데이터 조회
* Mutation
* 서버 데이터 동기화
* 로딩 및 에러 상태 관리

### Zustand

여러 컴포넌트 또는 페이지에서 공유해야 하는 클라이언트 상태를 관리합니다.

```text id="oz4uhm"
stores/
└── ...
```

공유가 필요한 UI 상태나 클라이언트 상태를 Store 단위로 관리합니다.

### React Local State

특정 컴포넌트 내부에서만 사용하는 간단한 UI 상태는 React의 `useState`를 사용합니다.

따라서 모든 클라이언트 상태를 Zustand에 저장하지 않고 상태의 범위에 따라 구분합니다.

```text id="trpccn"
Server에서 관리되는 데이터
        ↓
TanStack Query

여러 Component에서 공유하는 Client State
        ↓
Zustand

Component 내부의 Local UI State
        ↓
useState
```

---

## Server / Client Components

Next.js App Router의 Server Component를 기본으로 사용합니다.

클라이언트 기능이 필요한 경우 `'use client'`를 사용합니다.

예:

* TanStack Query Hook 사용
* Zustand Store 사용
* `useState`, `useEffect` 사용
* 이벤트 핸들러 사용
* Browser API 사용

---

## 디렉토리 구조 📁

```bash id="vw1af7"
├── README.md
├── package.json
├── package-lock.json
│
├── app
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
│
├── components
│   └── ui
│
├── features
│
├── hooks
│
├── lib
│   └── api
│       └── fetcher.ts
│
├── stores
│
├── types
│
├── public
│
├── .env.example
├── .env.local
├── .gitignore
├── .prettierignore
├── .prettierrc
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

### `app`

Next.js App Router 관련 파일을 관리합니다.

* Routing
* Layout
* Page
* Provider 연결

### `components`

여러 기능에서 공통으로 사용하는 UI 컴포넌트를 관리합니다.

```text id="pzjv9n"
components/
└── ui/
```

### `features`

기능 단위 코드를 관리합니다.

```text id="66tr8a"
features/
└── [feature]/
    ├── api.ts
    ├── types.ts
    ├── hooks/
    └── components/
```

* `api.ts`: 해당 기능의 API 요청 함수
* `types.ts`: 해당 기능의 타입
* `hooks/`: TanStack Query Hook
* `components/`: 해당 기능에서 사용하는 UI 컴포넌트

### `hooks`

특정 기능에 종속되지 않는 공통 React Hook을 관리합니다.

### `lib`

프로젝트 전반에서 사용하는 공통 로직을 관리합니다.

```text id="5l45dv"
lib/
└── api/
    └── fetcher.ts
```

### `stores`

Zustand를 이용한 전역 클라이언트 상태를 관리합니다.

```text id="qud1d2"
stores/
└── ...
```

공유가 필요한 상태를 Store 단위로 분리하여 관리합니다.

### `types`

여러 기능에서 공통으로 사용하는 타입을 관리합니다.

---

## Environment Variables

환경별 설정은 환경변수로 관리합니다.

```env id="21zm9v"
NEXT_PUBLIC_API_BASE_URL=
```

로컬 환경에서는 `.env.local`을 사용합니다.

필요한 환경변수 목록은 `.env.example` 파일을 통해 공유합니다.

---

## Deployment 🚀

프론트엔드는 Vercel을 통해 배포합니다.

```text id="b1kfm7"
Feature Branch
      ↓
Pull Request
      ↓
Vercel Preview
      ↓
Main Branch
      ↓
Vercel Production
```
