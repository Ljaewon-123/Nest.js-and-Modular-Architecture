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

# 각 모듈 표기법 

`<type>-<domain>-<?extension>`

- type: Identifies the type of the component, which can be context, worker, job, integration, webhook, or bff. Feel 
free to modify or add your own conventions.

- domain: The name of the business domain or context (e.g., orders, payments or shipping).

- extension (optional): An extension of the domain. It can represent a group of use cases related to the domain. Extensions are useful to avoid bloating the main component. They can directly access the entities and services of their context.


----
각 모듈당 외부로 export하는게 public-service와 facade가 있다면 왜 2개로 관리하는거지??


### Facade vs Public-Service 차이점
#### Public-Service

역할: 단일 도메인/리소스에 대한 비즈니스 로직과 검증을 처리
범위: 주로 하나의 도메인 내에서 동작 (예: 주문만 담당)
특징:

내부 Service의 직접적인 추상화
도메인 특화 비즈니스 규칙 구현
단일 서비스의 안정적인 API 제공

#### Facade

역할: 여러 서비스를 조율하여 복잡한 작업 수행
범위: 여러 도메인 간의 조율과 통합 (예: 주문 + 결제 + 배송)
특징:

여러 서비스를 조합하여 하나의 통합된 인터페이스 제공
복잡한 비즈니스 프로세스 오케스트레이션
여러 단계의 작업을 하나의 트랜잭션으로 관리



##### 왜 둘 다 필요할 수 있는가?

복잡성 수준 차이

Public-Service: 단일 도메인의 중간 복잡도 작업
Facade: 여러 도메인이 관여하는 높은 복잡도 작업


재사용성과 조합

Public-Service는 여러 Facade에서 재사용될 수 있음
동일한 Public-Service를 다양한 조합으로 Facade에서 활용 가능


테스트와 유지보수

Public-Service와 Facade를 분리하면 각각 독립적으로 테스트 가능
단일 책임 원칙에 더 충실한 구현

### 복잡한 애플리케이션: Public-Service와 Facade 모두 필요

- Public-Service: 도메인별 비즈니스 로직 캡슐화
- Facade: 여러 도메인 간 조율과 복잡한 프로세스 처리


간단한 애플리케이션: Public-Service만으로도 충분할 수 있음

도메인 간 상호작용이 적거나 비즈니스 프로세스가 단순할 경우

`by Sonnet`



### 구성요소간 통신제한

공용 서비스를 사용할 때는 데이터 전송에도 DTO를 사용해야 합니다 . DTO는 통신 중 비즈니스 규칙이 유출되는 것을 방지하고 클라이언트 구성 요소가 특정 언어 및 모델에 맞춰 자체적으로 데이터 표현을 생성할 수 있도록 합니다. 이를 통해 모델 간의 경계를 명확하게 유지하고 무결성을 손상시키지 않습니다.

Facade 패턴을 사용하면 공용 서비스와의 종속성을 추상화하고 DTO를 분리할 수 있습니다 . 도메인 클래스가 공용 서비스에 직접 의존하고 해당 DTO를 이해하는 대신 , 이러한 책임을 Facade 클래스로 이전합니다. 이렇게 하면 Facade 내에서 개념의 전달과 해석이 분리됩니다 .

또한, Facade 클래스 의 인터페이스는 내부 도메인 언어를 따라야 하며, 메서드는 로컬 도메인에 익숙한 객체를 반환해야 합니다. 즉, 경계를 넘는 데이터는 수신 측에 가장 편리한 형태로 제공되어야 합니다.

구성 요소의 가장 바깥쪽 계층에서 통신을 격리함으로써 개발자를 불필요한 방해로부터 보호하고 외부 변경 사항의 영향이 단일 계층에 국한되도록 보장합니다.


> public-service와 일반 service는 명확한 구분이 불가능하다면 음... 너무 추상화 될거같다
차라리 빼는게?