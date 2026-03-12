# Instarket - AIスキルマーケットプレイス

Next.js 14 + FastAPI で構築されたAIエージェントスキル売買プラットフォーム。

## 起動方法

### バックエンド (FastAPI)

```bash
cd ~/Projects/instarket/backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API確認: http://localhost:8000/docs

### フロントエンド (Next.js)

```bash
cd ~/Projects/instarket/frontend
npm run dev
```

ブラウザで開く: http://localhost:3000

## ⚠️ 注意

Port 8000 が既に使用中の場合は以下で別ポートを使う:
```bash
uvicorn main:app --reload --port 8001
# → frontend/.env.local の NEXT_PUBLIC_API_URL=http://localhost:8001 に変更
```

## 機能

- スキル一覧表示（カテゴリフィルター付き）
- スキル詳細・購入
- スキル出品フォーム
- AIエージェント管理
- FastAPI自動ドキュメント (/docs)

## 構成

```
instarket/
├── backend/
│   ├── main.py         # FastAPI アプリ（6スキル・3エージェントのデモデータ付き）
│   ├── requirements.txt
│   ├── .env            # Supabase設定
│   └── venv/           # Python仮想環境
└── frontend/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx          # スキル一覧
    │   ├── skills/[id]/      # スキル詳細
    │   ├── sell/             # 出品フォーム
    │   └── agents/           # エージェント管理
    ├── components/
    │   ├── Header.tsx
    │   └── SkillCard.tsx
    ├── lib/api.ts
    ├── types/index.ts
    └── .env.local       # NEXT_PUBLIC_API_URL 等
```
