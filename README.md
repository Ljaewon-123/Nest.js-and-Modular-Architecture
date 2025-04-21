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

File tree B 
```
src/
├── context-orders/                          # 주문 관련 컴포넌트
│   ├── model/                               # 도메인 엔티티 및 DAO 클래스
│   │   ├── order.entity.ts
│   │   ├── order.repository.ts
│   │   └── index.ts
│   ├── dtos/                                # 데이터 전송 객체
│   │   ├── create-order.dto.ts
│   │   ├── update-order.dto.ts
│   │   └── index.ts
│   ├── services/                            # 내부 비즈니스 로직 서비스
│   │   ├── order.service.ts
│   │   └── index.ts
│   ├── public-services/                     # 다른 컴포넌트에 노출되는 서비스
│   │   ├── public-order.service.ts
│   │   └── index.ts
│   ├── api/                                 # 컨트롤러 및 API 관련
│   │   ├── orders.controller.ts
│   │   └── index.ts
│   ├── facades/                             # 다른 컴포넌트와의 통신 추상화
│   │   ├── payment.facade.ts
│   │   └── index.ts
│   ├── orders.module.ts                     # Nest.js 모듈 정의
│   └── index.ts                             # 모듈 내보내기
│
├── context-payments/                        # 결제 관련 컴포넌트
│   ├── model/
│   │   ├── payment.entity.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── payment.service.ts
│   │   └── index.ts
│   ├── public-services/
│   │   ├── public-payment.service.ts
│   │   └── index.ts
│   ├── api/
│   │   ├── payments.controller.ts
│   │   └── index.ts
│   ├── payments.module.ts
│   └── index.ts
│
├── context-payments-refunds/                # 결제-환불 확장 컴포넌트
│   ├── model/
│   ├── services/
│   ├── public-services/
│   ├── api/
│   ├── refunds.module.ts
│   └── index.ts
│
├── job-reconciliation/                      # 결제 조정 작업 컴포넌트
│   ├── services/
│   ├── reconciliation.module.ts
│   └── index.ts
│
├── integration-psp/                         # 결제 서비스 제공자 통합 컴포넌트
│   ├── services/
│   ├── public-services/
│   ├── psp.module.ts
│   └── index.ts
│
├── shared/                                  # 공유 모듈
│   ├── utils/
│   ├── interceptors/
│   ├── filters/
│   ├── decorators/
│   ├── shared.module.ts
│   └── index.ts
│
├── configs/                                 # 설정 파일
│   ├── database.config.ts
│   ├── app.config.ts
│   └── index.ts
│
├── app.module.ts                            # 루트 모듈
└── main.ts                                  # 애플리케이션 진입점
```