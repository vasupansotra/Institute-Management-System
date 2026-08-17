const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

// AI Service configuration
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// Chat endpoint
router.post('/chat', checkAuth, async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verify = jwt.verify(token, '123');
        
        const { message } = req.body;
        
        if (!message || message.trim() === '') {
            return res.status(400).json({
                error: 'Message is required'
            });
        }
        
        console.log(`AI Chat request from user: ${verify.uId}, role: ${verify.role || 'student'}`);
        console.log(`Message: ${message}`);
        
        // Forward request to FastAPI AI service
        const aiResponse = await axios.post(
            `${AI_SERVICE_URL}/chat`,
            {
                message: message,
                token: token,
                user_id: verify.uId,
                role: verify.role || 'student'
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 30000 // 30 second timeout
            }
        );
        
        console.log(`AI Response from ${aiResponse.data.provider}: ${aiResponse.data.response.substring(0, 100)}...`);
        
        res.status(200).json({
            response: aiResponse.data.response,
            provider: aiResponse.data.provider,
            fallback_used: aiResponse.data.fallback_used,
            tool_used: aiResponse.data.tool_used
        });
        
    } catch (error) {
        console.error('AI Chat error:', error.message);
        
        // Handle different types of errors
        if (error.code === 'ECONNREFUSED') {
            return res.status(503).json({
                error: 'AI service is currently unavailable. Please try again later.'
            });
        }
        
        if (error.code === 'ETIMEDOUT') {
            return res.status(504).json({
                error: 'AI service request timed out. Please try again.'
            });
        }
        
        if (error.response) {
            // AI service returned an error
            return res.status(error.response.status).json({
                error: error.response.data.detail || 'AI service error'
            });
        }
        
        // Generic error
        res.status(500).json({
            error: 'Failed to process your request. Please try again.'
        });
    }
});

// Health check endpoint for AI service
router.get('/health', async (req, res) => {
    try {
        const healthResponse = await axios.get(`${AI_SERVICE_URL}/health`, {
            timeout: 5000
        });
        
        res.status(200).json({
            status: 'healthy',
            ai_service: healthResponse.data
        });
    } catch (error) {
        res.status(503).json({
            status: 'unhealthy',
            error: 'AI service is unavailable'
        });
    }
});

module.exports = router;