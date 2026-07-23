with open("components/CommunityHubView.tsx", "r") as f:
    c = f.read()

c = c.replace("l'altra", "l\\'altra")

with open("components/CommunityHubView.tsx", "w") as f:
    f.write(c)

with open("components/AnalyticsDashboardModal.tsx", "r") as f:
    c = f.read()

c = c.replace("un'eccellente", "un\\'eccellente")
c = c.replace("dell'AI", "dell\\'AI")

with open("components/AnalyticsDashboardModal.tsx", "w") as f:
    f.write(c)

with open("components/SkillTreeView.tsx", "r") as f:
    c = f.read()

c = c.replace("l'albero", "l\\'albero")

with open("components/SkillTreeView.tsx", "w") as f:
    f.write(c)
