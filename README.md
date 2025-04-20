# Nest.js-and-Modular-Architecture
Modular Architecture Configuration example


https://levelup.gitconnected.com/nest-js-and-modular-architecture-principles-and-best-practices-806c2cb008d5

See article




File tree A 

📁 NestJS 모듈러 + SCS + public-services + facades 파일 구조 예시
```
src/
├── order/
│   ├── model/                # Order 엔티티 및 DB 매핑
│   │   └── order.entity.ts
│   ├── services/             # 내부 유스케이스 로직
│   │   └── create-order.service.ts
│   ├── public-services/      # 다른 도메인에서 호출 가능한 서비스
│   │   └── order-public.service.ts
│   ├── facades/              # 다른 도메인과의 상호작용 추상화
│   │   └── order.facade.ts
│   ├── api/                  # Controller 및 라우팅
│   │   └── order.controller.ts
│   ├── dtos/                 # DTO 정의
│   │   └── create-order.dto.ts
│   └── order.module.ts       # NestJS 모듈 선언

├── payment/
│   ├── model/
│   │   └── payment.entity.ts
│   ├── services/
│   │   └── process-payment.service.ts
│   ├── public-services/
│   │   └── payment-public.service.ts
│   ├── facades/
│   │   └── payment.facade.ts
│   ├── api/
│   │   └── payment.controller.ts
│   ├── dtos/
│   │   └── create-payment.dto.ts
│   └── payment.module.ts

├── user/
│   ├── model/
│   │   └── user.entity.ts
│   ├── services/
│   │   └── create-user.service.ts
│   ├── public-services/
│   │   └── user-public.service.ts
│   ├── facades/
│   │   └── user.facade.ts
│   ├── api/
│   │   └── user.controller.ts
│   ├── dtos/
│   │   └── create-user.dto.ts
│   └── user.module.ts

├── shared/                   # 유틸, 공통 데코레이터, 인터셉터 등
│   ├── logger/
│   └── auth/
├── app.module.ts             # 루트 모듈
└── main.ts                   # 애플리케이션 진입점

```