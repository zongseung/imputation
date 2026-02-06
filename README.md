# ImputeX - Imputation Service

결측치 보간(`imputation`) 전용 서비스입니다.  
현재 문서는 `forecasting` 기능을 포함하지 않습니다.

## 개요

CSV 업로드 후 컬럼 역할을 지정하고, 선택한 모델로 결측치를 보간한 뒤 결과 CSV를 다운로드합니다.

- 프론트엔드: Next.js
- 백엔드 API: FastAPI
- 비동기 워커: Celery
- 저장소: PostgreSQL, Redis
- 배포: Docker Compose

## 현재 지원 모델

- `MICE`
- `KNN`
- `MEAN` (수치형 평균 / 범주형 최빈값)
- `REGRESSION`
- `NAOMI`
- `TOTEM` (VQVAE 기반 추론 보간)

## 처리 흐름

1. 파일 업로드: `POST /api/v1/analyze`
2. 스키마 리뷰: 컬럼 타입/역할 지정 (`TARGET`, `FEATURE`, `IGNORE`)
3. 작업 시작: `POST /api/v1/jobs/{job_id}/start`
4. 진행 조회: `GET /api/v1/jobs/{job_id}`
5. 결과 다운로드: `GET /api/v1/jobs/{job_id}/download`

## TOTEM 사용 정책

- 시간축 window 단위로 추론
- 결측 위치만 마스킹하고, 복원 출력은 결측 위치에만 반영
- 관측값은 덮어쓰지 않음
- window 병합 모드
  - `non_overlap` (기본): `stride = window_size`
  - `overlap`: `stride < window_size`, 겹침 구간 평균 병합

## 빠른 시작

```bash
docker compose up -d --build
docker compose ps
```

접속:

- UI: `http://localhost`
- API Docs: `http://localhost/api/docs`

## TOTEM 가중치 경로 (Docker)

`TOTEM` 모델 사용 시 컨테이너에서 접근 가능한 경로로 가중치를 마운트해야 합니다.

- 예: `models/totem/checkpoints/final_model.pth`
- macOS Docker Desktop 사용 시, 호스트 폴더가 File Sharing에 등록되어 있어야 합니다.

관련 환경 변수(백엔드):

- `TOTEM_MODEL_PATH` (기본: `/app/models/totem`)
- `TOTEM_CONFIG_PATH` (선택)
- `TOTEM_CODE_PATH` (기본: `/app/TOTEM/imputation`)

## 환경 변수

주요 백엔드 환경 변수:

```ini
DATABASE_URL=postgresql+psycopg2://imputex:imputex_password@postgres:5432/imputex
REDIS_URL=redis://redis:6379/0
UPLOAD_DIR=/app/uploads
RESULT_DIR=/app/results
MAX_UPLOAD_MB=500
SAMPLE_ROWS=1000
TOTEM_MODEL_PATH=/app/models/totem
TOTEM_CONFIG_PATH=
TOTEM_CODE_PATH=/app/TOTEM/imputation
```

## 출처 및 라이선스 고지

- 본 프로젝트는 외부 연구/코드(TOTEM, NAOMI)를 참조해 통합합니다.
- TOTEM 원본 저장소/배포물의 라이선스 표기가 불명확할 수 있으므로, 배포/상용 사용 전 별도 확인이 필요합니다.
- `README`에 출처를 명시하고, 사용 범위를 내부 검증/연구 목적으로 제한하는 정책을 권장합니다.
