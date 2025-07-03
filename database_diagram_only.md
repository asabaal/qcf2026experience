# ANCHORED Database Entity Relationship Diagram

## 🎯 Quick Reference
- **🔥 Red Tables:** MVP 1.0 (Core Foundation) - Build First!
- **✨ Blue Tables:** MVP 2.0 (AI Magic) - Build Second  
- **🚀 Green Tables:** MVP 3.0 (Community) - Build Third
- **🌐 Purple Tables:** Platform (Enterprise) - Build Last

---

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'background': '#1e1e2e', 'primaryColor': '#89b4fa', 'primaryTextColor': '#cdd6f4', 'primaryBorderColor': '#89b4fa', 'lineColor': '#6c7086', 'sectionBkColor': '#313244', 'altSectionBkColor': '#45475a', 'gridColor': '#585b70', 'secondaryColor': '#f38ba8', 'tertiaryColor': '#a6e3a1', 'quaternaryColor': '#cba6f7', 'fontFamily': 'ui-monospace, monospace'}}}%%
erDiagram
    %% 🔥 PHASE 1: MVP 1.0 - CORE FOUNDATION (RED)
    sessions {
        uuid id PK "🔑"
        text name "📋"
        text event_code "🎯"
        boolean active "✅"
        integer participant_count "👥"
        timestamp created_at "📅"
        timestamp updated_at "🔄"
        text status "📊"
        json metadata "📦"
    }
    
    participants {
        uuid id PK "🔑"
        uuid session_id FK "🔗"
        text mood_emoji "😊"
        text mood_label "🏷️"
        text user_agent "📱"
        text ip_address_hash "🔒"
        timestamp joined_at "⏰"
        timestamp last_active "💫"
        boolean is_active "🟢"
        json metadata "📦"
    }
    
    words {
        uuid id PK "🔑"
        uuid session_id FK "🔗"
        uuid participant_id FK "👤"
        text content "💬"
        text mood_context "🎭"
        integer display_order "🎯"
        timestamp created_at "📅"
        boolean approved "✅"
        text status "📊"
    }
    
    %% ✨ PHASE 2: MVP 2.0 - AI MAGIC (BLUE)
    groups {
        uuid id PK "🔑"
        uuid session_id FK "🔗"
        text name "👥"
        text formation_method "🧠"
        integer max_size "📏"
        timestamp created_at "📅"
        boolean active "✅"
        json metadata "📦"
    }
    
    verses {
        uuid id PK "🔑"
        uuid session_id FK "🔗"
        uuid group_id FK "👥"
        text content "🎵"
        text verse_number "🔢"
        text theme "🎨"
        timestamp created_at "📅"
        text status "📊"
        json ai_metadata "🤖"
    }
    
    ai_interactions {
        uuid id PK "🔑"
        uuid session_id FK "🔗"
        uuid participant_id FK "👤"
        text interaction_type "🤖"
        text prompt "💭"
        text response "🎯"
        text model_used "🧠"
        timestamp created_at "📅"
        json metadata "📦"
    }
    
    %% 🚀 PHASE 3: MVP 3.0 - COMMUNITY (GREEN)
    user_profiles {
        uuid id PK "🔑"
        text email "📧"
        text name "👤"
        text anchor_story "⚓"
        text commitment "🤝"
        text location "📍"
        timestamp created_at "📅"
        timestamp updated_at "🔄"
        boolean active "✅"
        json preferences "⚙️"
    }
    
    anchor_circles {
        uuid id PK "🔑"
        text name "⚓"
        text description "📝"
        uuid creator_id FK "👤"
        timestamp created_at "📅"
        boolean active "✅"
        json settings "⚙️"
    }
    
    %% 🌐 PHASE 4: PLATFORM - ENTERPRISE (PURPLE)
    organizations {
        uuid id PK "🔑"
        text name "🏢"
        text domain "🌐"
        text subscription_tier "💳"
        json settings "⚙️"
        timestamp created_at "📅"
        boolean active "✅"
    }

    %% 🔗 KEY RELATIONSHIPS
    sessions ||--o{ participants : "👥"
    sessions ||--o{ words : "💬"
    sessions ||--o{ groups : "🎯"
    sessions ||--o{ verses : "🎵"
    
    participants ||--o{ words : "✍️"
    participants ||--o{ ai_interactions : "🤖"
    
    groups ||--o{ verses : "🎵"
    
    user_profiles ||--o{ anchor_circles : "⚓"
    
    organizations ||--o{ sessions : "🎯"
```

## 📋 Phase Priority

### 🔥 Build First (MVP 1.0)
1. **sessions** - Core session management
2. **participants** - Anonymous user tracking  
3. **words** - Community word cloud

### ✨ Build Second (MVP 2.0)
4. **groups** - Smart group formation
5. **verses** - Collaborative song creation
6. **ai_interactions** - AI assistance tracking

### 🚀 Build Third (MVP 3.0)  
7. **user_profiles** - Persistent accounts
8. **anchor_circles** - Community groups

### 🌐 Build Last (Platform)
9. **organizations** - Multi-tenant platform

---

**View Full Documentation:** [Database Design](database-design.md)