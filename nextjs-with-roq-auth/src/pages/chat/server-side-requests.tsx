import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Chat } from '@roq/nextjs';
import AppLayout from 'layout/app/app.layout';
import DemoLayout from 'layout/demo/demo.layout';
import { routes } from 'routes';


function ChatPage() {
  const [tags, setTags] = useState<string[]>(['project', 'retrospective']);
  const [isTagApplied, setIsTagApplied] = useState(false);
  const [inEditState, setEditState] = useState<boolean>(false);
  const [isEditingGroupName, setEditingGroupName] = useState<boolean>(false);
  const [groupName, setGroupName] = useState<string>('');
  const [recentConversationId, setRecentConversationId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  const handleCreatePrivateConversation = async () => {
    setIsTagApplied(false);
    setLoading(true);
    try {
      const response = await fetch(routes.server.chat.createPrivateConversation, { method: 'POST' });
      toast.success(`Private Conversation Created!`)
      const { data } = await response.json();
      setRecentConversationId(data?.createConversation?.id)
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecentConversation = useCallback(async () => {
    try {
      const response = await fetch(routes.server.chat.deleteConversation, {
        method: 'POST',
        body: JSON.stringify({ id: recentConversationId })
      });
      await response.json();
      toast.success(`Conversation Deleted!`);
      setRecentConversationId('');
    } finally {
      setLoading(false);
    }
  }, [recentConversationId]);


  const handleCreateGroupConversation = useCallback(async () => {
    setEditingGroupName(false);
    setIsTagApplied(false);
    setLoading(true);
    try {
      const response = await fetch(routes.server.chat.createGroupConversation, {
        method: 'POST',
        body: JSON.stringify({ groupName }),
      });
      const { data } = await response.json();
      toast.success(`Group Conversation Created!`);
      setRecentConversationId(data?.createConversation?.id)
      setGroupName('');
    } finally {
      setLoading(false);
    }
  }, [groupName]);

  const handleSendSystemMessage = async () => {
    setIsTagApplied(false);
    setLoading(true);
    try {
      const response = await fetch(routes.server.chat.sendSystemMessage, { method: 'POST' });
      const { data } = await response.json();
      toast.success(`Conversation with System Bot Created!`);
      setRecentConversationId(data?.createConversation?.id)
    } finally {
      setLoading(false);
    }
  };

  const handleCreateConversationWithTags = useCallback(
      async () => {
        setIsTagApplied(true);
        setLoading(true);
        try {
          const response = await fetch(routes.server.chat.createConversationWithTags, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tags }),
          });
          const { data } = await response.json();
          toast.success(`Tagged Conversation Created!`);
          setRecentConversationId(data?.createConversation?.id)
        } finally {
          setLoading(false);
        }
      }, [tags]);

  return (
      <AppLayout>
        <DemoLayout>
          <div className="m5 flex flex-wrap">
            <button
                className="btn btn-sm m5"
                onClick={handleCreatePrivateConversation}
                disabled={loading}
            >
              Create a 1:1 conversation
            </button>
            {
                isEditingGroupName && (
                    <div className="flex">
                      <div className="flex w-100">
                        <input
                            value={groupName}
                            className="input w-100"
                            type="text"
                            disabled={loading}
                            placeholder="Name of group to be created"
                            onChange={({ target }) => setGroupName(target.value)}
                        />
                      </div>
                      <div className="flex w-100">
                        <button
                            className="btn btn-sm m5 btn-danger"
                            onClick={() => setEditingGroupName(false)}
                        >
                          Cancel
                        </button>
                        <button
                            className="btn btn-sm m5"
                            onClick={handleCreateGroupConversation}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                )
            }
            {
                !isEditingGroupName && (
                    <button
                        className="btn btn-sm m5"
                        onClick={() => setEditingGroupName(true)}
                        // onClick={}
                        disabled={loading}
                    >
                      Create a group conversation
                    </button>
                )
            }
            <button className="btn btn-sm m5" onClick={handleSendSystemMessage}
                    disabled={loading}

            >
              Send a &quot;system&quot; message
            </button>
            <button
                className="btn btn-sm m5"
                onClick={handleCreateConversationWithTags}
                disabled={loading}
            >
              Create a conversation with tags {JSON.stringify(tags)}
            </button>
            {
              inEditState ? (
                  <>
                    <input
                        value={tags?.join(', ')}
                        className="input"
                        type="text"
                        placeholder="Comma separated list of tags"
                        onChange={({ target }) => setTags(target?.value?.split(',') || [])}
                    />
                    <button
                        className="btn btn-sm"
                        onClick={() => {
                          setEditState(false);
                        }}
                    >
                      Save
                    </button>
                  </>
              ) : (
                  <button
                      className="btn btn-sm m5"
                      onClick={() => setEditState(true)}
                  >
                    Edit Tags
                  </button>
              )
            }
            <button
                className="btn btn-sm m5"
                onClick={() => setIsTagApplied((val) => !val)}
            >
              {isTagApplied ? 'Reset Tag Filter' : 'Filter By Tags'}
            </button>
            <button
                className="btn btn-sm btn-danger m5"
                disabled={loading || !recentConversationId}
                onClick={handleDeleteRecentConversation}
            >
              Delete Conversation
            </button>
          </div>
          {isTagApplied ? (
              <h3>Showing conversations with tags {JSON.stringify(tags)}</h3>
          ) : (
              <></>
          )}

          <div style={{ flex: 1, height: '80vh' }}>
            <Chat fluid={true} tags={isTagApplied ? tags : undefined}/>
          </div>
        </DemoLayout>
      </AppLayout>
  );
}

export default ChatPage;
