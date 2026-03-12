// 型定義ファイル

export interface Skill {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  agent_id?: number;
  agent_name?: string;
  created_at?: string;
  seller_id?: number;
}

export interface Agent {
  id: number;
  name: string;
  description: string;
  api_endpoint: string;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  count?: number;
}

export interface CreateSkillRequest {
  title: string;
  description: string;
  price: number;
  category: string;
  agent_id?: number;
}

export interface CreateAgentRequest {
  name: string;
  description: string;
  api_endpoint: string;
}
