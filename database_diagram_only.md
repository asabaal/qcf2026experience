# ANCHORED Database Entity Relationship Diagram

## 🎯 Quick Reference
- **🔥 Red Tables:** MVP 1.0 (Core Foundation) - Build First!
- **✨ Blue Tables:** MVP 2.0 (AI Magic) - Build Second  
- **🚀 Green Tables:** MVP 3.0 (Community) - Build Third
- **🌐 Purple Tables:** Platform (Enterprise) - Build Last

---

```mermaid
%%{init: {'theme':'base', 'themeVariables': { 'background': '#0a0e27', 'primaryColor': '#4f8ef7', 'primaryTextColor': '#ffffff', 'primaryBorderColor': '#4f8ef7', 'lineColor': '#64b5f6', 'sectionBkColor': '#2563eb', 'altSectionBkColor': '#7c3aed', 'gridColor': '#ffffff', 'secondaryColor': '#06b6d4', 'tertiaryColor': '#10b981', 'quaternaryColor': '#8b5cf6', 'fontFamily': 'Arial, sans-serif', 'fontSize': '13px'}}}%%
erDiagram
    %% 🔥 PHASE 1: MVP 1.0 - CORE FOUNDATION
    sessions {
        uuid id PK "🔑 PK"
        text name "📋 Name"
        text event_code "🎯 QR Code"
        boolean active "✅ Live"
        integer participant_count "👥 Count"
        timestamp created_at "📅 Created"
        timestamp updated_at "🔄 Updated"
        text status "📊 Status"
        json metadata "📦 Meta"
    }
    
    participants {
        uuid id PK "🔑 PK"
        uuid session_id FK "🔗 Session"
        text mood_emoji "😊 Mood"
        text mood_label "🏷️ Label"
        text user_agent "📱 Device"
        text ip_address_hash "🔒 IP Hash"
        timestamp joined_at "⏰ Joined"
        timestamp last_active "💫 Active"
        boolean is_active "🟢 Online"
        json metadata "📦 Meta"
    }
    
    words {
        uuid id PK "🔑 PK"
        uuid session_id FK "🔗 Session"
        uuid participant_id FK "👤 Author"
        text content "💬 Content"
        text mood_context "🎭 Context"
        integer display_order "🎯 Order"
        timestamp created_at "📅 Created"
        boolean approved "✅ OK"
        text status "📊 Status"
    }
    
    %% ✨ PHASE 2: MVP 2.0 - AI MAGIC
    groups {
        uuid id PK "🔑 PK"
        uuid session_id FK "🔗 Session"
        text name "👥 Name"
        text formation_method "🧠 Method"
        integer max_size "📏 Size"
        timestamp created_at "📅 Created"
        boolean active "✅ Active"
        json metadata "📦 Meta"
    }
    
    verses {
        uuid id PK "🔑 PK"
        uuid session_id FK "🔗 Session"
        uuid group_id FK "👥 Group"
        text content "🎵 Text"
        text verse_number "🔢 Number"
        text theme "🎨 Theme"
        timestamp created_at "📅 Created"
        text status "📊 Status"
        json ai_metadata "🤖 AI Data"
    }
    
    ai_interactions {
        uuid id PK "🔑 PK"
        uuid session_id FK "🔗 Session"
        uuid participant_id FK "👤 User"
        text interaction_type "🤖 Type"
        text prompt "💭 Input"
        text response "🎯 Output"
        text model_used "🧠 Model"
        timestamp created_at "📅 Created"
        json metadata "📦 Meta"
    }
    
    %% 🚀 PHASE 3: MVP 3.0 - COMMUNITY
    user_profiles {
        uuid id PK "🔑 PK"
        text email "📧 Email"
        text name "👤 Name"
        text anchor_story "⚓ Story"
        text commitment "🤝 Promise"
        text location "📍 Location"
        timestamp created_at "📅 Created"
        timestamp updated_at "🔄 Updated"
        boolean active "✅ Active"
        json preferences "⚙️ Prefs"
    }
    
    anchor_circles {
        uuid id PK "🔑 PK"
        text name "⚓ Name"
        text description "📝 Desc"
        uuid creator_id FK "👤 Creator"
        timestamp created_at "📅 Created"
        boolean active "✅ Active"
        json settings "⚙️ Config"
    }
    
    %% 🌐 PHASE 4: PLATFORM - ENTERPRISE
    organizations {
        uuid id PK "🔑 PK"
        text name "🏢 Name"
        text domain "🌐 Domain"
        text subscription_tier "💳 Plan"
        json settings "⚙️ Config"
        timestamp created_at "📅 Created"
        boolean active "✅ Active"
    }

    %% 🔗 CORE RELATIONSHIPS (MVP 1.0)
    sessions ||--o{ participants : "has participants"
    sessions ||--o{ words : "contains words"
    participants ||--o{ words : "submits words"
    
    %% 🔗 AI RELATIONSHIPS (MVP 2.0)  
    sessions ||--o{ groups : "organizes groups"
    sessions ||--o{ verses : "creates verses"
    sessions ||--o{ ai_interactions : "has AI calls"
    participants ||--o{ ai_interactions : "triggers AI"
    groups ||--o{ verses : "creates verses"
    
    %% 🔗 COMMUNITY RELATIONSHIPS (MVP 3.0)
    user_profiles ||--o{ anchor_circles : "creates circles"
    
    %% 🔗 PLATFORM RELATIONSHIPS (Enterprise)
    organizations ||--o{ sessions : "hosts sessions"
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