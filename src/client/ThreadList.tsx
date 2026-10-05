import { useThreads } from '@copilotkit/react-core/v2';
import { MessageCircle, Plus, Trash2 } from 'lucide-react';
import type { Conversation, Dot } from '../shared/types';
export function ThreadList({
  dots,
  dotId,
  local,
  selected,
  onSelect,
  onNew,
  onDelete,
}: {
  dots: Dot[];
  dotId: string;
  local: Conversation[];
  selected?: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete?: (id: string) => void;
}) {
  const threads = useThreads({
    agentId: dotId,
    enabled: true,
    includeArchived: false,
    limit: 20,
  });
  return (
    <section className="thread-list">
      <div className="nav-label">
        RECENT CHATS
        <button
          className="icon-button"
          onClick={onNew}
          aria-label="New conversation"
        >
          <Plus size={14} />
        </button>
      </div>
      {threads.error && (
        <p className="sidebar-error">
          Conversation sync unavailable. Check your runtime connection.
        </p>
      )}
      {local.map((thread) => {
        const remote = threads.threads.find((item) => item.id === thread.id);
        return (
          <div
            key={thread.id}
            className={`nav-item thread-nav-item ${selected === thread.id ? 'active' : ''}`}
            onClick={() => onSelect(thread.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(thread.id);
              }
            }}
          >
            <MessageCircle size={15} />
            <span className="thread-summary">
              <span>{remote?.name || thread.title}</span>
              <span className="thread-dot-name">
                {dots.find((dot) => dot.id === thread.dotId)?.name}
              </span>
            </span>
            {onDelete && (
              <button
                type="button"
                className="icon-button thread-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(thread.id);
                }}
                title="Delete chat"
                aria-label="Delete chat"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        );
      })}
      {!local.length && (
        <p className="sidebar-empty">Your first conversation will live here.</p>
      )}
      {threads.hasMoreThreads && (
        <button
          className="text-button"
          disabled={threads.isFetchingMoreThreads}
          onClick={() => void threads.fetchMoreThreads()}
        >
          Load more conversations
        </button>
      )}
    </section>
  );
}
