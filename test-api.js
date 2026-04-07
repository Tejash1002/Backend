const http = require('http');
const readline = require('readline');

const port = 5000;
const host = 'localhost';

// Setup readline interface for terminal input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

// Helper to make requests
const request = (method, path, data, token = null) => {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify(data);
        const options = {
            hostname: host,
            port: port,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data ? Buffer.byteLength(payload) : 0
            }
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = body ? JSON.parse(body) : {};
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', (e) => reject(e));
        if (data) req.write(payload);
        req.end();
    });
};

async function runTests() {
    console.log("------------------------------------------");
    console.log("🚀 STARTING INTERACTIVE API TEST");
    console.log("------------------------------------------\n");

    try {
        // GET USER INPUT
        const testEmail = await askQuestion("Enter Email: ");
        const testPassword = await askQuestion("Enter Password: ");
        const postTitle = await askQuestion("Enter Post Title: ");
        const postContent = await askQuestion("Enter Post Content: ");
        
        console.log("\n--- Processing Requests ---\n");

        // 1. SIGNUP (Optional - attempt to register, or move to login if exists)
        console.log(`Step 1: Checking/Registering [${testEmail}]...`);
        const signup = await request('POST', '/api/signup', {
            username: "terminal_user",
            email: testEmail,
            password: testPassword
        });
        
        if (signup.status === 201) {
            console.log(`Result: Status 201 - New user successfully created in Database.`);
        } else {
            console.log(`Result: Status ${signup.status} - ${signup.data.message || 'Proceeding to Login.'}`);
        }

        // 2. LOGIN
        console.log("\nStep 2: Authenticating and generating JWT...");
        const login = await request('POST', '/api/login', {
            email: testEmail,
            password: testPassword
        });
        
        const token = login.data.token;
        if (token) {
            console.log("Result: Success! JWT Token received.");
        } else {
            console.log("Result: Failed to get token. Check your credentials.", login.data);
            rl.close();
            return;
        }

        // 3. CREATE POST
        console.log(`\nStep 3: Saving post "${postTitle}" to Database...`);
        const post = await request('POST', '/api/posts', {
            title: postTitle,
            content: postContent
        }, token);
        console.log(`Result: Status ${post.status} - ${post.data.message || 'Done'}`);

        // 4. GET POSTS (Verification)
        console.log("\nStep 4: Fetching all posts to verify storage...");
        const allPosts = await request('GET', '/api/posts', null);
        console.log(`Result: Status ${allPosts.status}`);
        
        if (Array.isArray(allPosts.data) && allPosts.data.length > 0) {
            // Find the specific post we just created
            const latest = allPosts.data.find(p => p.title === postTitle);
            if (latest) {
                console.log(`✅ VERIFIED: Post found in Database! Author: [${latest.author}]`);
            } else {
                console.log(`⚠️ Warning: Post was saved but not found in current listing.`);
            }
        }

        console.log("\n------------------------------------------");
        console.log("✅ INTERACTIVE TEST COMPLETE");
        console.log("------------------------------------------");
        
    } catch (error) {
        console.log("\n❌ ERROR:");
        console.log(error.message);
    } finally {
        rl.close();
    }
}

runTests();