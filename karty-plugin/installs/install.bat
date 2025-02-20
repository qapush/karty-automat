@echo off

:: Przeszukujemy dostępne dyski w poszukiwaniu folderu
for /f "tokens=1,*" %%a in ('dir "BIBLIOTEKA\ELEMENTY\ZIMA\PODSTAWY WIZUALIZACJI\BG_KARTY\KARTY_AUTOMAT\plugin" /s /b 2^>nul') do (
    set "folder=%%a"
    goto :found
)

:found
:: Uzyskujemy literę dysku
for %%i in ("%folder%") do set "drive=%%~di"

:: Usuwamy wtyczkę
"%drive%\Program Files\Common Files\Adobe\Adobe Desktop Common\RemoteComponents\UPI\UnifiedPluginInstallerAgent\UnifiedPluginInstallerAgent.exe" /remove Karty

:: Instalujemy wtyczkę
"%drive%\Program Files\Common Files\Adobe\Adobe Desktop Common\RemoteComponents\UPI\UnifiedPluginInstallerAgent\UnifiedPluginInstallerAgent.exe" /install "%folder%\karty.mdk_PS.ccx"

pause

