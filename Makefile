git:
	git add .
	git commit -m "$m"
	@echo "------------------------------------------------"
	@git --no-pager show --name-only --oneline -1
	@echo "------------------------------------------------"
	git push