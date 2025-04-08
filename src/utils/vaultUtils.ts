// Local storage keys for managing archived chats
const ARCHIVED_CHATS_KEY = 'whisp-archived-chats';

// Check if a chat is archived
export const isArchived = (chatId: string): boolean => {
  try {
    const archivedChats = getArchivedChats();
    return archivedChats.includes(chatId);
  } catch (error) {
    console.error('Error checking if chat is archived:', error);
    return false;
  }
};

// Get all archived chat IDs
export const getArchivedChats = (): string[] => {
  try {
    const storedData = localStorage.getItem(ARCHIVED_CHATS_KEY);
    if (!storedData) return [];
    return JSON.parse(storedData);
  } catch (error) {
    console.error('Error getting archived chats:', error);
    return [];
  }
};

// Archive a chat
export const archiveChat = (chatId: string): void => {
  try {
    const archivedChats = getArchivedChats();
    if (!archivedChats.includes(chatId)) {
      archivedChats.push(chatId);
      localStorage.setItem(ARCHIVED_CHATS_KEY, JSON.stringify(archivedChats));
    }
  } catch (error) {
    console.error('Error archiving chat:', error);
  }
};

// Restore a chat from the archive
export const restoreChat = (chatId: string): void => {
  try {
    const archivedChats = getArchivedChats();
    const updatedArchive = archivedChats.filter(id => id !== chatId);
    localStorage.setItem(ARCHIVED_CHATS_KEY, JSON.stringify(updatedArchive));
  } catch (error) {
    console.error('Error restoring chat:', error);
  }
};

// Delete a chat permanently
export const deleteChat = (chatId: string): void => {
  try {
    // Remove from archive if it's archived
    restoreChat(chatId);
    
    // Remove chat data from localStorage
    localStorage.removeItem(`whisp-chat-${chatId}`);
  } catch (error) {
    console.error('Error deleting chat:', error);
  }
};

export default {
  isArchived,
  getArchivedChats,
  archiveChat,
  restoreChat,
  deleteChat
}; 