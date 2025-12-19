// Netlify function to proxy OpenAI requests
exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { question, user_id, chat_id } = JSON.parse(event.body);
    
    // Use environment variable for API key
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    
    if (!OPENAI_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'OpenAI API key not configured' })
      };
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are Spirit AI, an intelligent assistant. You have David\'s voice and can create video explanations. Respond in a friendly, helpful manner.'
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0]) {
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          answer: data.choices[0].message.content,
          user_id: user_id,
          chat_id: chat_id
        })
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'No response from OpenAI' })
      };
    }
    
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
