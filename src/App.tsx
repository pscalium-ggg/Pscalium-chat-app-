import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Chat from './Chat'
import ConversationList from './ConversationList'
import './App.css'

function App() {
  const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)
      const [activeConversationId, setActiveConversationId] = useState(null)

        useEffect(() => {
            supabase.auth.getSession().then(({ data: { session } }) => {
                  setSession(session)
                        setLoading(false)
                            })

                                const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                                      setSession(session)
                                          })

                                              return () => subscription.unsubscribe()
                                                }, [])

                                                  const handleLogout = async () => {
                                                      await supabase.auth.signOut()
                                                        }

                                                          if (loading) {
                                                              return <div style={{ textAlign: 'center', marginTop: 50 }}>Chargement...</div>
                                                                }

                                                                  if (!session) {
                                                                      return <Auth />
                                                                        }

                                                                          return (
                                                                              <div>
                                                                                    <div style={{ textAlign: 'center', padding: 10 }}>
                                                                                            <p>Connecté en tant que : {session.user.email}</p>
                                                                                                    <button onClick={handleLogout}>Se déconnecter</button>
                                                                                                          </div>

                                                                                                                {activeConversationId ? (
                                                                                                                        <Chat
                                                                                                                                  session={session}
                                                                                                                                            conversationId={activeConversationId}
                                                                                                                                                      onBack={() => setActiveConversationId(null)}
                                                                                                                                                              />
                                                                                                                                                                    ) : (
                                                                                                                                                                            <ConversationList
                                                                                                                                                                                      session={session}
                                                                                                                                                                                                onSelectConversation={(id) => setActiveConversationId(id)}
                                                                                                                                                                                                        />
                                                                                                                                                                                                              )}
                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                    )
                                                                                                                                                                                                                    }

                                                                                                                                                                                                                    export default App