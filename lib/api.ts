// API通信用ユーティリティ
import axios from 'axios';
import { Skill, Agent, CreateSkillRequest, CreateAgentRequest } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://44c3145b61595040-106-72-138-130.serveousercontent.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// スキル関連API
export const skillsApi = {
  // スキル一覧取得
  getAll: async (category?: string): Promise<Skill[]> => {
    const params = category ? { category } : {};
    const response = await api.get('/skills/', { params });
    return response.data;
  },

  // スキル詳細取得
  getById: async (id: number): Promise<Skill> => {
    const response = await api.get(`/skills/${id}`);
    return response.data;
  },

  // スキル作成
  create: async (data: CreateSkillRequest): Promise<Skill> => {
    const response = await api.post('/skills/', data);
    return response.data;
  },

  // スキル購入
  purchase: async (skillId: number, buyerId: number): Promise<any> => {
    const response = await api.post(`/skills/${skillId}/purchase`, { buyer_id: buyerId });
    return response.data;
  },
};

// エージェント関連API
export const agentsApi = {
  // エージェント一覧取得
  getAll: async (): Promise<Agent[]> => {
    const response = await api.get('/agents/');
    return response.data;
  },

  // エージェント詳細取得
  getById: async (id: number): Promise<Agent> => {
    const response = await api.get(`/agents/${id}`);
    return response.data;
  },

  // エージェント作成
  create: async (data: CreateAgentRequest): Promise<Agent> => {
    const response = await api.post('/agents/', data);
    return response.data;
  },
};

// カテゴリ一覧取得
export const categoriesApi = {
  getAll: async (): Promise<string[]> => {
    const response = await api.get('/categories/');
    return response.data;
  },
};

export default api;
