/**
 * NextAuth Configuration File
 * 
 * This file sets up authentication for the application using NextAuth.js.
 * NextAuth.js is a complete authentication solution for Next.js applications.
 * 
 * The file exports a default NextAuth configuration that handles:
 * - User login with username/email and password (Credentials Provider)
 * - JWT token generation and management
 * - Session management
 * - Custom callbacks to extend user data in sessions
 */

// Import environment variables (like AUTH_SECRET for JWT signing)
import environment from "@/config/environtment";

// Import CredentialsProvider - allows login with username/email and password
import CredentialsProvider from "next-auth/providers/credentials";

// Import our custom authentication service functions
import authServices from "@/services/auth.service";

// Import custom TypeScript types for extended User, Session, and JWT
import { JWTExtended, UserExtended, SessionExtend } from "@/types/Auth";

// Import NextAuth main function
import NextAuth from "next-auth";

/**
 * Export the NextAuth configuration
 * This creates an API route at /api/auth/[...nextauth] that handles all auth operations
 */
export default NextAuth({
    /**
     * Session Configuration
     * Defines how user sessions are stored and managed
     */
    session: {
        // Use JWT (JSON Web Token) strategy instead of database sessions
        // JWT tokens are stored in cookies and don't require a database
        strategy: "jwt",
        
        // Session expires after 24 hours (60 seconds * 60 minutes * 24 hours)
        maxAge: 60 * 60 * 24,
    }, // JWT session maxAge is 24 hours
    
    /**
     * Secret Key
     * Used to encrypt and sign JWT tokens
     * Should be stored in environment variables for security
     */
    secret: environment.AUTH_SECRET, // JWT secret
    
    /**
     * Authentication Providers
     * Define different ways users can authenticate (Google, GitHub, Email, etc.)
     * Here we're using Credentials Provider (username/password)
     */
    providers: [
        CredentialsProvider({
            // Unique identifier for this provider
            id: "credentials",
            
            // Display name for this provider
            name: "credentials",
            
            /**
             * Credentials Form Fields
             * Defines what fields the login form will have
             */
            credentials: {
                // Username or email field
                identifier: { label: "Username", type: "text" },
                // Password field (will be masked in the UI)
                password: { label: "Password", type: "password" },
            },
            
            /**
             * Authorize Function
             * This function is called when a user tries to log in
             * It validates the credentials and returns user data if valid, or null if invalid
             * 
             * @param credentials - The username/email and password from the login form
             * @returns UserExtended object if login is successful, null if it fails
             */
            async authorize(
                credentials: Record<"identifier" | "password", string> | undefined,
            ): Promise<UserExtended | null> {
                // Extract identifier (username/email) and password from credentials
                const { identifier, password } = credentials as {
                    identifier: string;
                    password: string;
                };

                // Step 1: Call the login API to authenticate the user
                // This sends the identifier and password to your backend
                const result = await authServices.login({
                    identifier,
                    password
                });

                // Extract the access token from the login response
                // The access token is used to authenticate API requests
                const accessToken = result.data.data;
                // Step 2: Get the user's profile information using the access token
                // This fetches the full user data from your backend
                const me = await authServices.getProfileWithToken(accessToken);
                const user = me.data.data;

                /**
                 * Validation Check
                 * Verify that:
                 * - Access token was received
                 * - Login API returned success (status 200)
                 * - User has a valid ID (_id)
                 * - Profile API returned success (status 200)
                 */
                if (
                    accessToken &&
                    result.status === 200 &&
                    user._id &&
                    me.status === 200
                ) {
                    // Attach the access token to the user object
                    // This allows us to use it later for authenticated API calls
                    user.accessToken = accessToken;
                    // Return the user object - NextAuth will create a session for this user
                    return user;
                } else {
                    // Return null if validation fails - login will be rejected
                    return null;
                }
            }
        })
    ],
    
    /**
     * Callbacks
     * Functions that are called at specific points in the authentication flow
     * Allow you to customize the JWT token and session data
     */
    callbacks: {
        /**
         * JWT Callback
         * Called whenever a JWT token is created or updated
         * Use this to add custom data to the JWT token
         * 
         * @param token - The JWT token object
         * @param user - The user object returned from authorize() (only on first login)
         * @returns The modified token
         */
        async jwt({
            token, 
            user
        }: {
            token: JWTExtended;
            user: UserExtended | null
        }) {
            // On first login, user object is available
            // Store the entire user object in the token
            if (user) {
                token.user = user;
            }

            // Return the token - it will be stored in a cookie
            return token;
        },
        
        /**
         * Session Callback
         * Called whenever a session is checked (e.g., getSession(), useSession())
         * Use this to customize what data is available to the client
         * 
         * @param session - The session object that will be sent to the client
         * @param token - The JWT token (contains the user data we stored in jwt callback)
         * @returns The modified session
         */
        async session(
            {
                session,
                token
            }: {
                session: SessionExtend,
                token: JWTExtended
            }) {
            // Copy user data from token to session
            // This makes user data available in client components via useSession()
            session.user = token.user;
            
            // Add the access token to the session
            // This allows client-side code to make authenticated API calls
            session.accessToken = token.user?.accessToken;

            // Return the session - it will be available to the client
            return session;
        }
    }
});